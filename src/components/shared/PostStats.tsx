import { Models } from "appwrite";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLikePost, useSavePost, useDeleteSavedPost, useGetCurrentUser } from "@/lib/react-query/queries";
import { checkIsLiked } from "@/lib/utils";

type PostStatsProps = {
  post: Models.Document;
  userId: string;
};

const PostStats: React.FC<PostStatsProps> = ({ post, userId }) => {
  const location = useLocation();
  const likesList = post.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState<string[]>(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost } = useSavePost();
  const { mutate: deleteSavePost } = useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUser();

  useEffect(() => {
    if (currentUser && currentUser.save) {
      const savedPostRecord = currentUser.save.find(
        (record: Models.Document | null) => record?.post?.$id === post.$id
      );
      setIsSaved(!!savedPostRecord);
    }
  }, [currentUser, post.$id]);

  const handleLikePost = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.stopPropagation();

    let updatedLikes = [...likes];

    if (checkIsLiked(likes, userId)) {
      updatedLikes = updatedLikes.filter((id) => id !== userId);
    } else {
      updatedLikes.push(userId);
    }

    setLikes(updatedLikes);
    likePost({ postId: post.$id, likesArray: updatedLikes });
  };

  const handleSavePost = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.stopPropagation();

    if (isSaved) {
      setIsSaved(false);
      deleteSavePost(currentUser?.save?.find((record: { post: { $id: string; }; }) => record?.post?.$id === post.$id)?.$id || "");
    } else {
      setIsSaved(true);
      savePost({ userId: userId, postId: post.$id });
    }
  };

  const containerStyles = location.pathname.startsWith("/profile") ? "w-full" : "";

  return (
    <div className={`flex gap-3 justify-between items-center z-20 ${containerStyles}`}>
      <div className="flex items-center gap-2">
        <img
          src={checkIsLiked(likes, userId) ? "/assets/icons/liked.svg" : "/assets/icons/like.svg"}
          alt="like"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={handleLikePost}
        />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>

      <div className="flex items-center gap-2">
        <img
          src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
          alt="save"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={handleSavePost}
        />
      </div>
    </div>
  );
};

export default PostStats;
