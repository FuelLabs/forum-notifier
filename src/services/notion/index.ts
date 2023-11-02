import { Client } from "@notionhq/client";
import { notionKey } from "../../config";

export * from "./tickets";
export * from "./events";
export * from "./types"



export const notionClient = new Client({ auth: notionKey })

