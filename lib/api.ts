export async function getArticles() {
  const response = await fetch('/api/articles');
  if (!response.ok) throw new Error('Failed to fetch articles');
  return response.json();
}

export async function getArticle(id: string) {
  const response = await fetch(`/api/articles/${id}`);
  if (!response.ok) throw new Error('Failed to fetch article');
  return response.json();
}

export async function createArticle(data: ArticleFormData) {
  const response = await fetch('/api/articles', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create article');
  return response.json();
}

export async function updateArticle(id: string, data: ArticleFormData) {
  const response = await fetch(`/api/articles/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update article');
  return response.json();
}

export async function deleteArticle(id: string) {
  const response = await fetch(`/api/articles/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete article');
  return response.json();
}

export async function getCategories() {
  const response = await fetch('/api/article-category');
  if (!response.ok) throw new Error('Failed to fetch categories');
  return response.json();
}

export async function getCategory(id: string) {
  const response = await fetch(`/api/article-category/${id}`);
  if (!response.ok) throw new Error('Failed to fetch category');
  return response.json();
}