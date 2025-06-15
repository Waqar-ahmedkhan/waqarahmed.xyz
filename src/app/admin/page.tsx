
// "use client";
// import { useState } from "react";
// import { supabase } from "@/lib/supabase";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { useRouter } from "next/navigation";

// export default function Admin() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [techStack, setTechStack] = useState("");
//   const [link, setLink] = useState("");
//   const [error, setError] = useState("");
//   const [password, setPassword] = useState("");
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const router = useRouter();

//   const handleLogin = () => {
//     if (password === "admin123") { // Replace with secure auth in production
//       setIsAuthenticated(true);
//     } else {
//       setError("Incorrect password");
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const { error } = await supabase.from("projects").insert([
//       {
//         title,
//         description,
//         tech_stack: techStack.split(",").map((tag) => tag.trim()),
//         link: link || null,
//       },
//     ]);
//     if (error) {
//       setError("Failed to add project: " + error.message);
//     } else {
//       setTitle("");
//       setDescription("");
//       setTechStack("");
//       setLink("");
//       alert("Project added successfully!");
//       router.push("/");
//     }
//   };

//   if (!isAuthenticated) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-background">
//         <div className="w-full max-w-md space-y-4">
//           <h2 className="text-2xl font-bold">Admin Login</h2>
//           <Input
//             type="password"
//             value={password}
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
//             placeholder="Enter password"
//           />
//           <Button onClick={handleLogin}>Login</Button>
//           {error && <p className="text-red-500">{error}</p>}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Add New Project</h2>
//       <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
//         interface TitleInputProps {
//           title: string;
//           setTitle: React.Dispatch<React.SetStateAction<string>>;
//         }

//         const TitleInput: React.FC<TitleInputProps> = ({ title, setTitle }) => (
//           <div>
//             <label className="block text-sm font-medium">Title</label>
//             <Input
//               value={title}
//               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
//               placeholder="Project Title"
//               required
//             />
//           </div>
//         );

//         // Usage in the form:
//         <TitleInput title={title} setTitle={setTitle} />
//         <div>
//           <label className="block text-sm font-medium">Description</label>
//           <Textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder="Project Description"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium">Tech Stack (comma-separated)</label>
//           <Input
//             value={techStack}
//             onChange={(e) => setTechStack(e.target.value)}
//             placeholder="React, Next.js, TypeScript"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium">Link (optional)</label>
//           <Input
//             value={link}
//             onChange={(e) => setLink(e.target.value)}
//             placeholder="https://project.com"
//           />
//         </div>
//         <Button type="submit">Add Project</Button>
//         {error && <p className="text-red-500">{error}</p>}
//       </form>
//     </div>
//   );
// }
