import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostForm.css';

interface PostFormProps {
  onPostSaved: () => Promise<void>;
  selectedPost: { id: number; title: string; content: string } | null;
  onClose: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ onPostSaved, selectedPost, onClose }) => {
  const [title, setTitle] = useState(selectedPost ? selectedPost.title : '');
  const [content, setContent] = useState(selectedPost ? selectedPost.content : '');
  const [image, setImage] = useState<File | null>(null);
  const [travelDate, setTravelDate] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]); // 선택된 태그 상태
  const navigate = useNavigate();

  const [location_name] = useState('San Francisco');
  const [latitude] = useState(37.7749);
  const [longitude] = useState(-122.4194);

  // 태그 목록을 배열로 정의
  const tagOptions = [
    '해변', '산', '도시', '섬', '하이킹', '캠핑', '가족', '친구', '여름', '가을', '럭셔리', '배낭 여행'
  ];

  useEffect(() => {
    if (selectedPost) {
      setTitle(selectedPost.title);
      setContent(selectedPost.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [selectedPost]);

  const handleTagChange = (tag: string) => {
    // 태그 선택/해제 로직
    setSelectedTags((prevTags) =>
      prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const postData = {
      user_id: 1,
      title,
      content,
      location_name,
      latitude,
      longitude,
      travel_date: travelDate,
      tags: selectedTags, // 선택된 태그 포함
    };

    try {
      const response = await fetch('http://localhost:3000/api/travel-records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        await onPostSaved();
        onClose();
      } else {
        console.error("Failed to save post. Status:", response.status);
      }
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="post-form-container">
      <header className="post-form-header">
        <button onClick={() => navigate('/')} className="home-button">홈 화면으로</button>
        <h2>기록 작성</h2>
      </header>

      <form onSubmit={handleSubmit} className="post-form-content">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목"
          required
          className="post-form-title"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력하세요"
          required
          className="post-form-content-textarea"
        />
        <div className="post-form-image-section">
          <label htmlFor="file-upload" className="image-upload-label">사진 추가</label>
          <input type="file" id="file-upload" onChange={handleImageChange} className="image-upload-input" />
          {image && <p>선택된 파일: {image.name}</p>}
        </div>
        <div className="post-form-date-section">
          <label htmlFor="travel-date" className="date-label">여행 날짜</label>
          <input
            type="date"
            id="travel-date"
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
            className="date-input"
            required
          />
        </div>

        {/* 태그 선택 섹션 추가 */}
        <div className="post-form-tag-section">
          <label className="tag-label">태그 선택</label>
          <div className="tag-options">
            {tagOptions.map((tag) => (
              <label key={tag} className="tag-option">
                <input
                  type="checkbox"
                  value={tag}
                  checked={selectedTags.includes(tag)}
                  onChange={() => handleTagChange(tag)}
                />
                {tag}
              </label>
            ))}
          </div>
        </div>

        <div className="post-form-buttons">
          <button type="button" onClick={handleCancel} className="cancel-button">취소</button>
          <button type="submit" className="save-button">저장</button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
