import {
  ANYONE_CAN_DO_ANYTHING,
  boolean,
  createSchema,
  definePermissions,
  PermissionsConfig,
  string,
  table
} from "@rocicorp/zero";
import { AuthData } from "node_modules/@rocicorp/zero/out/zero-client/src/client/replicache-types";

const users = table("users")
    .columns({
        id: string(),
        name: string(),
    })
    .primaryKey("id");

const tasks = table("tasks")
    .from("app-1.tasks")
    .columns({
        id: string(),
        title: string(),
        completed: boolean(),
    })
    .primaryKey("id");

const posts = table("posts")
    .from("app-2.posts")
    .columns({
        id: string(),
        title: string(),
    })
    .primaryKey("id");

export const schema = createSchema({
    tables: [users, tasks, posts],
});

export type Schema = typeof schema;

export const permissions = definePermissions<undefined, Schema>(schema, () => {
    return {
        users: ANYONE_CAN_DO_ANYTHING,
        tasks: ANYONE_CAN_DO_ANYTHING,
        posts: ANYONE_CAN_DO_ANYTHING,
    } satisfies PermissionsConfig<AuthData, Schema>;
});
