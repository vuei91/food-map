import { Client } from "@elastic/elasticsearch";

export function initClient() {
  // connect to elasticsearch
  const client = new Client({
    node: process.env.NEXT_PUBLIC_ELASTICSEARCH_URL!,
    auth: {
      username: process.env.NEXT_PUBLIC_ELASTICSEARCH_USERNAME!,
      password: process.env.NEXT_PUBLIC_ELASTICSEARCH_PASSWORD!,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  return client;
}

export async function createIndex({
  client,
}: {
  client: Client;
}): Promise<void> {
  const exists = await client.indices.exists({
    index: process.env.NEXT_PUBLIC_ELASTICSEARCH_INDEX!,
  });
  if (!exists) {
    await client.indices.create(getNgramAndNoriSettings());
    console.log(
      `Index '${process.env.NEXT_PUBLIC_ELASTICSEARCH_INDEX}' created successfully.`
    );
  } else {
    console.log(
      `Index '${process.env.NEXT_PUBLIC_ELASTICSEARCH_INDEX}' already exists.`
    );
  }
}

function getNgramAndNoriSettings() {
  return {
    index: process.env.NEXT_PUBLIC_ELASTICSEARCH_INDEX!,
    settings: {
      index: {
        max_ngram_diff: 20,
      },
      analysis: {
        filter: {
          ngram_filter: {
            type: "ngram",
            min_gram: 1,
            max_gram: 20,
          },
        },
        analyzer: {
          ngram_analyzer: {
            type: "custom",
            tokenizer: "nori_tokenizer",
            filter: ["lowercase", "ngram_filter"],
          },
        },
      },
    },
    mappings: {
      properties: {
        title: {
          type: "text",
          analyzer: "ngram_analyzer",
        },
        description: {
          type: "text",
          analyzer: "ngram_analyzer",
        },
        tags: {
          type: "text",
          analyzer: "ngram_analyzer",
        },
        address: {
          type: "text",
          analyzer: "ngram_analyzer",
        },
      },
    },
  };
}

export async function insertData({
  client,
  document,
}: {
  client: Client;
  document: any;
}) {
  await client.index({
    index: process.env.NEXT_PUBLIC_ELASTICSEARCH_INDEX!,
    document,
  });
}

export async function deleteData({
  client,
  documentId,
}: {
  client: Client;
  documentId: string;
}) {
  await client.delete({
    index: process.env.NEXT_PUBLIC_ELASTICSEARCH_INDEX!,
    id: documentId,
  });
}

export async function searchData({
  client,
  keyword,
}: {
  client: Client;
  keyword: string;
}) {
  const response = await client.search({
    index: process.env.NEXT_PUBLIC_ELASTICSEARCH_INDEX,
    body: {
      query: {
        bool: {
          should: [
            { term: { title: keyword } },
            { term: { description: keyword } },
            { term: { tags: keyword } },
            { term: { address: keyword } },
            { term: { category: keyword } },
          ],
        },
      },
    },
  });
  return response.hits.hits.map((hit: any) => hit._source);
}
