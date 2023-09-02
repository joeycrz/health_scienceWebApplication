import React, { useEffect, useState } from "react";
import { db } from '../firebase';
import { auth } from "../firebase";
import { set, ref, remove, onValue, update, get, orderByChild, query } from 'firebase/database'; // Import query function
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ChakraBaseProvider, Text, Box, } from "@chakra-ui/react";

const AuthDelete = () => {
    const [authUser, setAuthUser] = useState(null);
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });

        return () => {
            listen();
        }
    }, []);

    const userSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log("You signed out successfully");
            })
            .catch(error => console.log(error));
    }

    const deletePostByTimestamp = (timestampToDelete) => {
        const postsRef = ref(db, "/"); // Assuming your posts are stored at the root level

        // Use the query function here to query the database
        const q = query(postsRef, orderByChild("timestamp").equalTo(timestampToDelete));

        get(q)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    // Assuming there's only one post with the given timestamp, delete it
                    const postKey = Object.keys(snapshot.val())[0];
                    const postRef = ref(db, `/${postKey}`);

                    remove(postRef)
                        .then(() => {
                            console.log("Post deleted successfully.");
                        })
                        .catch((error) => {
                            console.error("Error deleting post:", error);
                        });
                } else {
                    console.log("No post found with the specified timestamp.");
                }
            })
            .catch((error) => {
                console.error("Error querying database:", error);
            });
    };

    return (
        <ChakraBaseProvider>
            {authUser ? (
                <button onClick={() => deletePostByTimestamp(todo.timestamp)}>Delete</button>
            ) : (
                <Box>
                    <Text className="imported">You do not have permission to post.</Text>
                </Box>
            )}
        </ChakraBaseProvider>
    );
}

export default AuthDelete;
