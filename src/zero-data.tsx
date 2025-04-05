import { Zero } from "@rocicorp/zero";
import { ZeroProvider as _ZeroProvider, useQuery } from "@rocicorp/zero/react";
import { schema as zeroSchema } from "./schema.zero";

export function ZeroData() {
    const z = new Zero({
        userID: "guest",
        schema: zeroSchema,
        auth: () => {
            return undefined;
        },
        kvStore: "idb",
        server: "http://localhost:4848",
    });

    const postsQuery = z.query.posts;
    const [posts] = useQuery(postsQuery);
    console.log("🚀 ~ ZeroData ~ posts:", posts);

    const tasksQuery = z.query.tasks;
    const [tasks] = useQuery(tasksQuery);
    console.log("🚀 ~ ZeroData ~ tasks:", tasks);

    const usersQuery = z.query.user;
    const [users] = useQuery(usersQuery);
    console.log("🚀 ~ ZeroData ~ users:", users);

    return (
        <div>
            <h1 className="text-2xl font-bold">
                {posts.length ? "Posts" : "No posts"}
            </h1>
            {posts.map((post) => (
                <p key={post.id}>{post.title}</p>
            ))}

            <h1 className="text-2xl font-bold">
                {tasks.length ? "Tasks" : "No tasks"}
            </h1>
            {tasks.map((task) => (
                <p key={task.id}>{task.title}</p>
            ))}

            <h1 className="text-2xl font-bold">
                {users.length ? "Users" : "No users"}
            </h1>
            {users.map((user) => (
                <p key={user.id}>{user.name}</p>
            ))}
        </div>
    );
}

export function ZeroProvider({ children }: { children: React.ReactNode }) {
    const z = new Zero({
        userID: "guest",
        schema: zeroSchema,
        auth: () => {
            return undefined;
        },
        kvStore: "idb",
        server: "http://localhost:4848",
    });

    return <_ZeroProvider zero={z}>{children}</_ZeroProvider>;
}
