"use client";
import { useEffect, useState } from "react";
import apiClient from "./configs/api";
import PostService from "./services/posts";
import { useQuery } from "react-query";
import { Post } from "./services/types";

import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Link,
  Stack,
  Chip,
} from "@mui/material";
import formatarData from "@/util/formatDate";

export default function Home() {
  const { data, dataUpdatedAt, error, isFetched, isLoading, isError } =
    useQuery<Post[]>("posts", () => PostService.getAllPosts());

  return (
    <div>
      {isLoading ? (
        <>Carregando ... </>
      ) : (
        <>
          <Container>
            <Grid container spacing={3} style={{ marginTop: "20px" }}>
              {data?.map((post, index) => (
                <Grid item xs={4} key={index}>
                  <Link
                    href={`/post/${post.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <a style={{ textDecoration: "none", color: "inherit" }}>
                      <Card>
                        <CardMedia
                          component="img"
                          height="140"
                          image={post?.imageUrl}
                          alt={post.title}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {post.title}
                          </Typography>
                          <Typography
                            variant="body1"
                            style={{
                              textOverflow: "ellipsis",
                              maxHeight: "50px",
                              maxWidth: "200px",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                            }}
                            dangerouslySetInnerHTML={{
                              __html: post.content,
                            }}
                          />

                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            style={{ marginTop: "10px", fontFamily: "Roboto" }}
                          >
                            Por <strong>{post.author.name}</strong>, em
                            <strong> {formatarData(post.publishDate)}</strong>
                          </Typography>
                          <Stack direction="row" sx={{ margin: "10px 0" }}>
                            {post.category && (
                              <Chip label={post?.category} color="primary" />
                            )}
                          </Stack>
                        </CardContent>
                      </Card>
                    </a>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Container>
          <footer
            style={{
              backgroundColor: "#333",
              color: "#fff",
              padding: "20px",
              textAlign: "center",
              marginTop: "50vh",
            }}
          >
            <Typography variant="body1">&copy; 2024 Meu Blog</Typography>
          </footer>
        </>
      )}
    </div>
  );
}
