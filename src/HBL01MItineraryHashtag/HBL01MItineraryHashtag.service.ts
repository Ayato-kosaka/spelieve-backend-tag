import { firestore } from 'firebase-admin';
import {
  DocumentData,
  Query,
  QueryDocumentSnapshot,
} from 'firebase-admin/firestore';
import { lastValueFrom } from 'rxjs';

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { Itineraries } from 'spelieve-common/lib/Models/Itinerary/IDB01/Itineraries';
import { Client } from '@elastic/elasticsearch';
import type { SearchResponse } from '@elastic/elasticsearch/lib/api/types';
// import { PBL002UpsertPlaceDataServiceRule } from './PBL002UpsertPlaceData.rule';

@Injectable()
export class HBL01MItineraryHashtagService {
  constructor(private readonly httpService: HttpService) {}

  async doExecute() {
    // リクエストに合致する QueryDocumentSnapshot を取得する
    const itineraryCollectionRef = firestore().collection(
      Itineraries.modelName,
    );
    const itineraryDocumentSnap: QueryDocumentSnapshot<DocumentData>[] | [] =
      await itineraryCollectionRef
        .get()
        .then((qss) => (qss.empty ? [] : qss.docs));

    const tag_list: Array<string> = itineraryDocumentSnap
      .map((doc) => doc.data().tags)
      .flat();

    const sampleTags = [
      ...tag_list,
      ...[
        'いい景色',
        '食事に最適',
        '紅葉いい',
        '景色最高',
        '夜景巡り',
        '食べ歩き',
        'いい景色',
        'いい景色',
        '食事に最適',
        '食事に最適',
        '夜景旅',
        '紅葉満開',
        '紅葉狩り',
      ],
    ];

    // count tags frequency
    const toDict = (arr: Array<string>): { [key: string]: number } => {
      let dict: { [key: string]: number } = {};
      arr.map((e) => {
        if (dict[e]) {
          dict[e]++;
        } else {
          dict[e] = 1;
        }
      });
      return dict;
    };
    const tagsDict: { [key: string]: number } = toDict(sampleTags);

    const client = new Client({
      cloud: { id: process.env.ELASTIC_CLOUD_ID },
      auth: { apiKey: process.env.ELASTIC_CLOUD_API_KEY },
    });

    // fetch all documentIDs
    const docs: SearchResponse = await client.search({
      index: 'search-itinerary-tags',
      query: {
        match_all: {},
      },
      stored_fields: [],
    });
    const documentIDs = [];
    for (let hit of docs.hits.hits) {
      documentIDs.push(hit._id);
    }

    // delete all documents
    documentIDs.map((id) => {
      client.delete({
        index: 'search-itinerary-tags',
        id,
      });
    });

    // insert new tags data
    Object.keys(tagsDict).map(async (tag: string) => {
      client.index({
        index: 'search-itinerary-tags',
        document: {
          tag,
          attached_count: tagsDict[tag],
        },
      });
    });
    return 'Success';
  }
}
