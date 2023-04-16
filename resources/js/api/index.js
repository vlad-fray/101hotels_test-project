import axios from "axios";

const axiosInstanceNullableErrors = axios.create({
    baseURL: `http://localhost:80/api`,
});

axiosInstanceNullableErrors.interceptors.request.use(
    (config) => config,
    () => Promise.resolve(null),
);

axiosInstanceNullableErrors.interceptors.response.use(
    (config) => config,
    () => Promise.resolve(null),
);

export const API = {
    async getAllComments() {
        const res = await axiosInstanceNullableErrors.get('/comments/');
        
        return res && res.status === 200 ? res.data : null;
    },
    async getCommentById(id) {
        const res = await axiosInstanceNullableErrors.get(`/comments/${id}`);

        return res && res.status === 200 ? res.data : null;
    },
    async createComment(newComment) {
        const res = await axiosInstanceNullableErrors.post('/comments', newComment);

        return res && res.status === 200;
    },
    async deleteCommentById(id) {
        const res = await axiosInstanceNullableErrors.delete(`/comments/${id}`);

        return res && res.status === 200;
    },
    async updateCommentById(id, text) {
        const res = await axiosInstanceNullableErrors.patch(`/comments${id}`, text);

        return res && res.status === 200;
    },
};