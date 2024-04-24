"use client";

import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Post } from "../../services/types";
import PostService from "../../services/posts";
import { useRouter } from "next/router";
import {
  Typography,
  Container,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useParams } from "next/navigation";
import formatarData from "@/util/formatDate";

const PostDetails = () => {
  const params = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery<any>(["post"], () =>
    PostService.getAllPosts()
  );

  const [post, setPost] = useState();
  console.log(params.id);
  console.log(data);

  useEffect(() => {
    setPost(data?.filter((post) => post.id == params.id));
  }, [data]);

  if (isLoading) return <Typography variant="body1">Carregando...</Typography>;
  if (isError)
    return <Typography variant="body1">Erro ao carregar o post.</Typography>;

  return (
    <Container sx={{ marginTop: 4 }}>
      {post && (
        <Card elevation={3} sx={{ padding: "2rem" }}>
          <CardContent>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
              {post[0]?.title}
            </Typography>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              sx={{ marginBottom: 2 }}
            >
              <strong>Por {post[0]?.author.name}</strong>, em{" "}
              <strong>{formatarData(post[0]?.publishDate)}</strong>
            </Typography>
            <CardMedia
              component="img"
              height="300"
              image={post[0]?.imageUrl}
              alt={post[0]?.title}
              sx={{ borderRadius: 4 }}
            />
            <Typography
              variant="p"
              dangerouslySetInnerHTML={{ __html: post[0]?.content }}
              sx={{ marginTop: 2 }}
            />
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default PostDetails;
