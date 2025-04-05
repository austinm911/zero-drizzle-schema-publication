import { ANYONE_CAN_DO_ANYTHING, definePermissions } from "@rocicorp/zero";
import { createZeroSchema } from "drizzle-zero";
import * as drizzleSchema from "./schema";

export const schema = createZeroSchema(drizzleSchema, {
  tables: {
      user: {
        id: true,
        name: true,
      },
      tasks: {
        id: true,
        title: true,
        completed: true,
      },
      posts: {
        id: true,
        title: true,
        content: true,
      },
    
  },
});

type Schema = typeof schema;

export const permissions = definePermissions<{}, Schema>(schema, () => {
  return {
    posts: ANYONE_CAN_DO_ANYTHING,
    user: ANYONE_CAN_DO_ANYTHING,
    tasks: ANYONE_CAN_DO_ANYTHING,
  };
});
