// FullScreenModal.js
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";
import { FaImage } from "react-icons/fa";
import axios from "axios";

const FullScreenModal = ({ show, onHide }) => {
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    post_image: null,
  });

  const { title, content, post_image } = formData;

  const onChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "post_image") {
      setFormData({ ...formData, post_image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Create an instance of FormData to handle file uploads
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    if (post_image) {
      postData.append("post_image", post_image);
    }

    // Using Axios to send POST request
    try {
      const response = await axios.post(`/story`, postData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Post Successful:", response.data);
      onHide(); // Close modal after successful post
    } catch (error) {
      console.error("Failed to post:", error);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      dialogClassName="full-screen-modal"
      style={{ opacity: 1 }}
    >
      <Form onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Full Screen Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={title}
              onChange={onChange}
              required
              placeholder="Enter title"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Content:</Form.Label>
            <Form.Control
              as="textarea"
              name="content"
              value={content}
              onChange={onChange}
              rows={3}
              required
              placeholder="Write your content here"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Upload Image:</Form.Label>
            <div className="custom-file">
              <Form.Control
                type="file"
                className="custom-file-input"
                name="post_image"
                onChange={onChange}
                id="post_image"
              />
              <Form.Label className="custom-file-label">
                <FaImage /> Choose file...
              </Form.Label>
            </div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default FullScreenModal;
