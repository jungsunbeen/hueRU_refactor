import axios from "axios";

export const baseURL = "https://maknaengee.p-e.kr";

// 리뷰 가져오기
export const getReview = async () => {
    try {
        const response = await axios.get(`${baseURL}/review/`);
        return response.data;
    } catch (error) {
        console.error('Error in getReviw:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// id로 리뷰 가져오기
export const getReviewById = async (id) => {
    try {
        const response = await axios.get(`${baseURL}/review/${id}`);
        return response.data;
    } catch (error) {
        alert('리뷰를 찾을 수 없습니다.');
        console.error('Error in getReviewById:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// 공고 가져오기
export const getNotice = async () => {
    try {
        const access = localStorage.getItem("access_token");
        if (!access) throw new Error("No access token found in localStorage");
        const response = await axios.get(`${baseURL}/notice`, {
            headers: {
                Authorization: `Bearer ${access}`
            },
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            alert("로그인 후 사용하실 수 있는 기능입니다");
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            window.location.href = "/login";
        } else {
            console.error('Error in getSearchByCategory:', error.response ? error.response.data : error.message);
            throw error;
        }
    }
};

// 공고 가져오기
export const getNoticeById = async (notice_id) => {
    try {
        const access = localStorage.getItem("access_token");
        if (!access) throw new Error("No access token found in localStorage");
        const response = await axios.get(`${baseURL}/notice/${notice_id}/`, {
            headers: {
                Authorization: `Bearer ${access}`
            },
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            alert("로그인 후 사용하실 수 있는 기능입니다");
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            window.location.href = "/login";
        } else {
            console.error('Error in getSearchByCategory:', error.response ? error.response.data : error.message);
            throw error;
        }
    }
};

// 카테고리에 따른 공고,후기 가져오기 → /search/?large_category=CAREER
    export const getSearchByCategory = async (category) => {
        try {
            const access = localStorage.getItem("access_token");
            if (!access) {
                const response = await axios.get(`${baseURL}/search/?large_category=${category}`);
                return response.data;
            }
            const response = await axios.get(`${baseURL}/search/?large_category=${category}`, {
                headers: {
                    Authorization: `Bearer ${access}`
                },
            });
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 401) {
                alert("로그인 후 사용하실 수 있는 기능입니다");
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
            } else {
                console.error('Error in getSearchByCategory:', error.response ? error.response.data : error.message);
                throw error;
            }
        }
    }

// 카테고리에 따른 공고,후기 가져오기 → /review/?large_category=CAREER
export const getReviewByCategory = async (category) => {
    try {
        const response = await axios.get(`${baseURL}/review/?large_category=${category}`);
        return response.data;
    } catch (error) {
        console.error('Error in getReviewByCategory:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// 리뷰 좋아요하기
export const getHandleReviewLike = async (notice_id) => {
    try {
        const access = localStorage.getItem("access_token");
        if (!access) throw new Error("No access token found in localStorage");
        const response = await axios.get(`${baseURL}/review/likes/${notice_id}`, {
            headers: {
                Authorization: `Bearer ${access}`
            },
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            alert("로그인 후 사용하실 수 있는 기능입니다");
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            window.location.href = "/login";
        } else {
            console.error('Error in getSearchByCategory:', error.response ? error.response.data : error.message);
            throw error;
        }
    }
};

//공고 좋아요하기
export const getHandleNoticeLike = async (notice_id) => {
    try {
        const access = localStorage.getItem("access_token");
        if (!access) throw new Error("No access token found in localStorage");
        const response = await axios.get(`${baseURL}/notice/likes/${notice_id}`, {
            headers: {
                Authorization: `Bearer ${access}`
            },
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            alert("로그인 후 사용하실 수 있는 기능입니다");
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            window.location.href = "/login";
        } else {
            console.error('Error in getSearchByCategory:', error.response ? error.response.data : error.message);
            throw error;
        }
    }
}

// 리뷰 보관함에 담기
export const getHandleReviewSaved = async (notice_id) => {
    try {
        const access = localStorage.getItem("access_token");
        if (!access) throw new Error("No access token found in localStorage");
        const response = await axios.get(`${baseURL}/review/storages/${notice_id}`, {
            headers: {
                Authorization: `Bearer ${access}`
            },
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            alert("로그인 후 사용하실 수 있는 기능입니다");
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            window.location.href = "/login";
        } else {
            console.error('Error in getSearchByCategory:', error.response ? error.response.data : error.message);
            throw error;
        }
    }
}
// 공고 보관함에 담기
export const getHandleNoticeSaved = async (notice_id) => {
    try {
        const access = localStorage.getItem("access_token");
        if (!access) throw new Error("No access token found in localStorage");
        const response = await axios.get(`${baseURL}/notice/storages/${notice_id}`, {
            headers: {
                Authorization: `Bearer ${access}`
            },
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            alert("로그인 후 사용하실 수 있는 기능입니다");
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            window.location.href = "/login";
        } else {
            console.error('Error in getSearchByCategory:', error.response ? error.response.data : error.message);
            throw error;
        }
    }
}

// 검색하기 
export const getSearchByKeyword = async (keyword) => {
    try {
        const access = localStorage.getItem("access_token");
        if (!access) throw new Error("No access token found in localStorage");
        const response = await axios.get(`${baseURL}/search/?${keyword}`, {
            headers: {
                Authorization: `Bearer ${access}`
            },
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            alert("로그인 후 사용하실 수 있는 기능입니다");
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            window.location.href = "/login";
        } else {
            console.error('Error in getSearchByCategory:', error.response ? error.response.data : error.message);
            throw error;
        }
    }
}

// 일반 후기글 작성하기
export const postMyReview = async (data) => {
    try {
        const access = localStorage.getItem("access_token");
        if (!access) throw new Error("No access token found in localStorage");
        const response = await axios.post(`${baseURL}/review/`, data, {
            headers: {
                Authorization: `Bearer ${access}`,
                'Content-Type': 'multipart/form-data'
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error in postMyReview:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// 후기글 댓글 가져오기 
export const getReviewComment = async (review_id) => {
    try {
        const response = await axios.get(`${baseURL}/review/${review_id}/comments/`);
        return response.data;
    } catch (error) {
        console.error('Error in getReviewComment:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// 후기글 댓글 작성하기
export const postReviewComment = async (review_id, comment) => {
    try {
        const access = localStorage.getItem("access_token");
        if (!access) throw new Error("No access token found in localStorage");
        const response = await axios.post(`${baseURL}/review/${review_id}/comments/`, comment, {
            headers: {
                Authorization: `Bearer ${access}`,
                'Content-Type': 'application/json'
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error in postReviewComment:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// 후기글 작성하기
export const postReview = async (data) => {
    try {
        const access = localStorage.getItem("access_token");
        if (!access) throw new Error("No access token found in localStorage");
        const response = await axios.post(`${baseURL}/bingo/review/`, data, {
            headers: {
                Authorization: `Bearer ${access}`,
                'Content-Type': 'multipart/form-data'
            },
        });
        return response.data;
    } catch (error) {
        alert("이미 작성하신 후기입니다.");
        console.error('Error in postReview:', error.response ? error.response.data : error.message);
        throw error;
    }
}