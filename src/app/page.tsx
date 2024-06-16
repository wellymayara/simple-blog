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
  CircularProgress,
  Button,
  Pagination,
} from "@mui/material";
import formatarData from "@/util/formatDate";
import { setHeapSnapshotNearHeapLimit } from "v8";

export default function Home() {
  const [page, setPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");

  const {
    data: allPosts,
    error,
    isFetched,
    isLoading,
    isError,
    refetch: reAllPosts,
    isRefetching,
  } = useQuery(["posts", page], () => PostService.getAllPosts(page), {
    keepPreviousData: true, // Manter os dados anteriores enquanto faz refetch
  });

  const { data: category } = useQuery("category", () =>
    PostService.getCategories()
  );

  const { data: dataCategory, refetch: refetchCategory } = useQuery(
    ["selectedCategory", selectedCategory, page],
    () => PostService.getPostsByCategory(selectedCategory, page),
    { enabled: !!selectedCategory, keepPreviousData: true }
  );

  const handleSelectCategory = (category: any) => {
    setSelectedCategory(category);
    setPage(0); // Reset page when category changes
  };

  const handlePage = (event: any, value: any) => {
    setPage(value - 1);
  };

  useEffect(() => {
    if (!selectedCategory) {
      reAllPosts();
    }
  }, [page, reAllPosts, selectedCategory]);

  const data = selectedCategory ? dataCategory : allPosts?.content;

  console.log(isLoading, data);
  return (
    <div>
      {isLoading || !data ? (
        <CircularProgress color="success" />
      ) : (
        <>
          <aside>
            <Typography variant="h6" sx={{ marginLeft: "10px" }}>
              Categorias:
            </Typography>
            <Button onClick={() => setSelectedCategory("")}>Todos</Button>
            {category?.map((category) => (
              <Button onClick={() => handleSelectCategory(category)}>
                {category}
              </Button>
            ))}
          </aside>
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
          <Pagination
            page={page + 1}
            count={allPosts?.totalPages}
            color="primary"
            onChange={handlePage}
            sx={{ margin: "2rem auto" }}
          />
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
