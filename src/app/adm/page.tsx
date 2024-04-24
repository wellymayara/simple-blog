"use client";
import React, { useEffect, useState } from "react";
import Table from "../components/molecules/table";
import { useQuery } from "react-query";
import { Post } from "../services/types";
import "react-quill/dist/quill.snow.css";
import PostService from "../services/posts";
import dynamic from "next/dynamic";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
} from "@mui/material";
import { Author } from "next/dist/lib/metadata/types/metadata-types";
import axios from "axios";
import apiClient from "../configs/api";

const initialPost: Post = {
  title: "",
  imageUrl: "",
  author: "",
  slug: "",
};

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Adm = () => {
  const { data } = useQuery<Author[]>("authors", () =>
    PostService.getAuthors()
  );

  const [newPost, setNewPost] = useState<Post>(initialPost);
  const [error, setError] = useState<string | null>(null);
  const [openInfo, setOpenInfo] = useState(false);
  const [inputErrors, setInputErrors] = useState<{
    [key: string]: string | null;
  }>({
    title: null,
    imageUrl: null,
    category: null,
    author: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value as string });
    setInputErrors({ ...inputErrors, [name]: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    apiClient
      .post("/posts", newPost)
      .then((res) => {
        setError(null);
        setOpenInfo(true);
      })
      .catch((error) => {
        console.error("Error adding post:", error);
        setError("Erro ao adicionar o post. Por favor, tente novamente.");
      })
      .finally(() => {
        setTimeout(() => setOpenInfo(false), 3000);
      });
  };

  const handleDescriptionChange = (value: string) => {
    setNewPost({ ...newPost, content: value });
  };

  useEffect(() => {
    setNewPost({ ...newPost, slug: newPost.title.replaceAll(" ", "-") });
  }, [newPost.title]);

  console.log(newPost);

  return (
    <div>
      <Grid container spacing={3} alignItems="center" justifyContent="center">
        {openInfo && <Alert severity="success">Post Salvo</Alert>}
        <Grid item xs={8}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Adicionar Novo Post
              </Typography>
              <form onSubmit={(e) => handleSubmit(e)}>
                <TextField
                  label="Título"
                  name="title"
                  value={newPost.title}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  error={!!inputErrors.title}
                  helperText={inputErrors.title}
                  onBlur={() => {
                    if (!newPost.title.trim()) {
                      setInputErrors({
                        ...inputErrors,
                        title: "O título é obrigatório.",
                      });
                    } else {
                      setInputErrors({ ...inputErrors, title: null });
                    }
                  }}
                />
                <TextField
                  label="Slug"
                  name="slug"
                  value={newPost.slug}
                  fullWidth
                  margin="normal"
                  disabled
                />
                <ReactQuill
                  value={newPost.content}
                  onChange={handleDescriptionChange}
                  style={{
                    marginBottom: "50px",
                    height: "200px",
                    marginTop: "20px",
                  }}
                />
                <TextField
                  label="URL da Imagem"
                  name="imageUrl"
                  value={newPost.imageUrl}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  error={!!inputErrors.imageUrl}
                  helperText={inputErrors.imageUrl}
                />
                <TextField
                  label="Categoria"
                  name="category"
                  value={newPost.category}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  error={!!inputErrors.category}
                  helperText={inputErrors.category}
                  onBlur={() => {
                    if (!newPost.category.trim()) {
                      setInputErrors({
                        ...inputErrors,
                        category: "A categoria é obrigatória.",
                      });
                    } else {
                      setInputErrors({ ...inputErrors, category: null });
                    }
                  }}
                />

                <FormControl fullWidth error={!!inputErrors.author}>
                  <InputLabel id="demo-simple-select-label">Autor</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Autor"
                    name="author"
                    value={newPost.author.id}
                    onChange={(e) => {
                      setNewPost({
                        ...newPost,
                        author: { id: e.target.value as string },
                      });
                      setInputErrors({ ...inputErrors, author: null });
                    }}
                    onBlur={() => {
                      if (!newPost?.author?.trim()) {
                        setInputErrors({
                          ...inputErrors,
                          author: "O autor é obrigatório.",
                        });
                      } else {
                        setInputErrors({ ...inputErrors, author: null });
                      }
                    }}
                  >
                    {data?.map((author) => (
                      <MenuItem key={author.id} value={author.id}>
                        {author.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {inputErrors.author && (
                    <Typography variant="body2" color="error">
                      {inputErrors.author}
                    </Typography>
                  )}
                </FormControl>

                {error && (
                  <Typography variant="body2" color="error">
                    {error}
                  </Typography>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "30px", marginLeft: "75%" }}
                >
                  Adicionar Post
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Adm;
