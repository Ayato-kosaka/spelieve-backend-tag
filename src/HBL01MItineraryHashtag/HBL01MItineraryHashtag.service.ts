import { Client } from '@elastic/elasticsearch';
import { firestore } from 'firebase-admin';
import { DocumentData, QueryDocumentSnapshot } from 'firebase-admin/firestore';

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { Itineraries } from 'spelieve-common/lib/Models/Itinerary/IDB01/Itineraries';

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

    const mItineraryHashTagList: m_itinerary_hashtags[] = []
    const created_at = new Date();
    itineraryDocumentSnap.docs.map(doc => doc.data())
    .forEach((itinerary) => {
      itinerary.tags.forEach(tag => {
        const element = mItineraryHashTagList.find(value => value.tag === tag);
        if (element) {
            element.attached_count += 1;
        } else {
          mItineraryHashTagList.push({
              attached_count: 1,
              tag: tag,
              created_at: created_at
            });
        }
      }
      )
    });

    const indexName = 'search-m_itinerary_hashtags';
    const client = new Client({
      cloud: { id: process.env.ELASTIC_CLOUD_ID },
      auth: { apiKey: process.env.ELASTIC_CLOUD_API_KEY },
    });

    // fetch all documentIDs
    const docs: SearchResponse = await client.search({
      index: indexName,
      query: {
        match_all: {},
      },
      stored_fields: [],
    });
    const documentIDs = [];
    for (const hit of docs.hits.hits) {
      documentIDs.push(hit._id);
    }

    // delete all documents
    documentIDs.map((id) => {
      client.delete({
        index: indexName,
        id,
      });
    });

    // insert new tags data
    Object.keys(tagsDict).map(async (tag: string) => {
      client.index({
        index: indexName,
        document: {
          tag,
          attached_count: tagsDict[tag],
        },
      });
    });
    return {};
  }
}
