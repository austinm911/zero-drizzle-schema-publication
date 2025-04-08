import { Zero } from "@rocicorp/zero";
import { ZeroProvider as _ZeroProvider, useQuery, useZero } from "@rocicorp/zero/react";
import { schema as zeroSchema, Schema } from "./schema.drizzle-zero";
// import { schema as zeroSchema, Schema } from "./schema.zero";

export function ZeroData() {
    const z = useZero<Schema>();

    const postsQuery = z.query.posts;
    const [posts] = useQuery(postsQuery);
    console.log("🚀 ~ ZeroData ~ posts:", posts);

    const handleCreatePost = async () => {
        await z.mutate.posts.insert({
            id: crypto.randomUUID(),
            title: `New Post ${Math.random()}`,
        }).then(() => {
            console.log("Post created");
        }).catch((error) => {
            console.error("Error creating post", error);
        });
    };

    const handleDeletePost = async (id: string | undefined) => {
        if (!id) return;
        await z.mutate.posts.delete({ id });
    };

    const tasksQuery = z.query.tasks;
    const [tasks] = useQuery(tasksQuery);
    console.log("🚀 ~ ZeroData ~ tasks:", tasks);

    const handleCreateTask = async () => {
        await z.mutate.tasks.insert({
            id: crypto.randomUUID(),
            title: `New Task ${Math.random()}`,
            completed: false,
        }).then(() => {
            console.log("Task created");
        }).catch((error) => {
            console.error("Error creating task", error);
        });
    };

    const handleDeleteTask = async (id: string | undefined) => {
        if (!id) return;
        await z.mutate.tasks.delete({ id });
    };

    const usersQuery = z.query.users;
    const [users] = useQuery(usersQuery);
    console.log("🚀 ~ ZeroData ~ users:", users);

    const handleCreateUser = async () => {
        await z.mutate.users.insert({
            id: crypto.randomUUID(),
            name: `New User ${Math.random()}`,
        }).then(() => {
            console.log("User created");
        }).catch((error) => {
            console.error("Error creating user", error);
        });
    };

    const handleDeleteUser = async (id: string | undefined) => {
        if (!id) return;
        await z.mutate.users.delete({ id });
    };

    return (
        <div className="grid grid-cols-3 gap-4 w-full max-w-4xl mx-auto p-4">
            <section className="p-4 rounded-lg bg-gray-800">
                <h1 className="text-2xl font-bold mb-4">
                    {posts.length ? "Posts" : "No posts"}
                </h1>
                <div className="space-y-2 mb-4">
                    {posts.map((post) => (
                        <p key={post.id} className="p-2 rounded shadow-sm bg-gray-700">{post.title}</p>
                    ))}
                </div>
                <button 
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors" 
                    onClick={handleCreatePost}
                >
                    Create Post
                </button>   
                <button 
                    className="w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors" 
                    onClick={() => handleDeletePost(posts[0]?.id ?? undefined)}
                >
                    Delete Post
                </button>
            </section>

            <section className="p-4 rounded-lg bg-gray-800">
                <h1 className="text-2xl font-bold mb-4">
                    {tasks.length ? "Tasks" : "No tasks"}
                </h1>
                <div className="space-y-2 mb-4">
                    {tasks.map((task) => (
                        <p key={task.id} className="p-2 rounded shadow-sm bg-gray-700">{task.title}</p>
                    ))}
                </div>
                <button 
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors" 
                    onClick={handleCreateTask}
                >
                    Create Task
                </button>
                <button 
                    className="w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors" 
                    onClick={() => handleDeleteTask(tasks[0]?.id ?? undefined)}
                >
                    Delete Task
                </button>
            </section>

            <section className="p-4 rounded-lg bg-gray-800">
                <h1 className="text-2xl font-bold mb-4">
                    {users.length ? "Users" : "No users"}
                </h1>
                <div className="space-y-2 mb-4">
                    {users.map((user) => (
                        <p key={user.id} className="p-2 rounded shadow-sm bg-gray-700">{user.name}</p>
                    ))}
                </div>
                <button 
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors" 
                    onClick={handleCreateUser}
                >
                    Create User
                </button>
                <button 
                    className="w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors" 
                    onClick={() => handleDeleteUser(users[0]?.id ?? undefined)}
                >
                    Delete User
                </button>
            </section>
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
