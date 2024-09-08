import React, { useState } from 'react';
import axios from 'axios';

const ImageUploadForm = () => {
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    large_category: "CAREER",
    title: "GS25 알바하기",
    content: "GS25 야간 알바를 하였다.",
    duty: "직무",
    employment_form: "채용 형태",
    area: "제주도",
    procedure: "모집 절차 내용",
    date: "2024-08-20",
    start_date: "2024-08-20",
    end_date: "2024-09-20",
    detailplans: [
      { content: "내가 야간 알바를 하다니" },
      { content: "이 것은 세부 계획" }
    ]
  });

  const handleImagesChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('detailplans')) {
      const index = parseInt(name.split('[')[1].split(']')[0], 10);
      const updatedDetailPlans = [...formData.detailplans];
      updatedDetailPlans[index].content = value;
      setFormData({ ...formData, detailplans: updatedDetailPlans });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Add images to FormData
    images.forEach((image, index) => {
      data.append(`images[${index}]`, image);
    });

    // Add form data as a JSON string
    const jsonFormData = JSON.stringify(formData);
    data.append('json', jsonFormData);

    // Debugging FormData content
    for (let pair of data.entries()) {
      console.log(pair[0] + ', ' + pair[1]); 
    }

    try {
      const access = localStorage.getItem("access_token");
      if (!access) throw new Error("No access token found in localStorage");
      const response = await axios.post(`https://maknaengee.p-e.kr/review/`, data, {
        headers: {
          Authorization: `Bearer ${access}`,
          'Content-Type': 'multipart/form-data'
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error in postMyReview:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="large_category">Large Category:</label>
        <input type="text" name="large_category" value={formData.large_category} onChange={handleInputChange} required />
      </div>
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <textarea name="content" value={formData.content} onChange={handleInputChange} required></textarea>
      </div>
      <div>
        <label htmlFor="duty">Duty:</label>
        <input type="text" name="duty" value={formData.duty} onChange={handleInputChange} required />
      </div>
      <div>
        <label htmlFor="employment_form">Employment Form:</label>
        <input type="text" name="employment_form" value={formData.employment_form} onChange={handleInputChange} required />
      </div>
      <div>
        <label htmlFor="area">Area:</label>
        <input type="text" name="area" value={formData.area} onChange={handleInputChange} required />
      </div>
      <div>
        <label htmlFor="procedure">Procedure:</label>
        <textarea name="procedure" value={formData.procedure} onChange={handleInputChange} required></textarea>
      </div>
      <div>
        <label htmlFor="start_date">Start Date:</label>
        <input type="date" name="start_date" value={formData.start_date} onChange={handleInputChange} required />
      </div>
      <div>
        <label htmlFor="end_date">End Date:</label>
        <input type="date" name="end_date" value={formData.end_date} onChange={handleInputChange} required />
      </div>
      {formData.detailplans.map((plan, index) => (
        <div key={index}>
          <label htmlFor={`detailplans[${index}][content]`}>Detail Plan {index + 1}:</label>
          <textarea
            name={`detailplans[${index}][content]`}
            value={plan.content}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
      ))}
      <div>
        <label htmlFor="images">Images:</label>
        <input type="file" name="images" accept="image/*" multiple onChange={handleImagesChange} required />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ImageUploadForm;