import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get the post UUID
import { db } from '../firebase';

import { uid } from 'uid';
import { set, ref, remove, onValue, update, get, off } from 'firebase/database';
import { getAuth, onAuthStateChanged, listUsers } from 'firebase/auth';
import { initializeApp } from 'firebase/app';


const AnnouncementPostPage = () => {
  const { uuid } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const postRef = ref(db, `/${uuid}`);
    onValue(postRef, (snapshot) => {
      const postData = snapshot.val();
      setPost(postData);
    });

    return () => {
      // Unsubscribe from the database when the component unmounts
      off(postRef);
    };
  }, [uuid]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.todo}</p>
    </div>
  );
}

export default AnnouncementPostPage;
