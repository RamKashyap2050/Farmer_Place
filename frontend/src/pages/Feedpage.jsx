import React, {useState, useEffect } from 'react';
import { useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HeaderforUser from '../components/HeaderforUser';
import Footer from '../components/Footer'
import '../styles/Feedpage.css'
import { ToastContainer, toast } from 'react-toastify';
import AllUserPostFeedforUser from '../components/AllUserPostFeedforUser';
import FewMarketPlaceProducts from '../components/FewMarketPlaceProducts';
import { FaImage } from 'react-icons/fa';

const Feedpage = () => {
  const navigate = useNavigate()
  const {user} = useSelector((state) => state.auth) 
  const { token } = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    title: '',
    content:'',
    post_image:''
  })

  const { title, content, post_image } = formData


  useEffect(() => {
    console.log('useEffect triggered with user:', user)
    if (!user){
      navigate('/loginuser')
    }
  },[user,navigate])

  const onChange = (e) => {
    if (e.target.type === 'file') {
      const file = e.target.files[0];
      setFormData((prevState) => ({
        ...prevState,
        post_image: file,
      }))
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const onSubmit = async(e) => {
    e.preventDefault()

      const userData = new FormData();
      userData.append('title',title);
      userData.append('content', content);
      userData.append('post_image', post_image);

      
  try {
    const response = await fetch('http://localhost:3002/Feed', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: userData
    });
    toast.success('Posted Succesfully')
    if (!response.ok) {
      throw new Error('Network response was not ok');
      
    }

    setFormData({
      title: '',
      content:'',
      post_image:''
    });
  } catch (error) {
    console.error('Error:', error);
    toast.error('Error occurred while posting the data');
  }

  }

  return (
    <>
    <HeaderforUser /><br />
          <div className='Feedpagecontainer'>
          <div className='Feedpage'>
            
        {/* <h3 style={{textAlign:"center", fontWeight:700}}>Share what's on your mind ?</h3>
        <span class="line"></span><br /><br /> */}

        <form onSubmit={onSubmit} encType="multipart/form-data" className='form'>
        <div class="form-group">
          <label for="title" class="text-white">Title:</label>
          <input type="text" id="title" name="title" class="form-control form-control-lg" required  value={title} onChange={onChange} placeholder='Share what is on your mind'/>
        </div>
        <div class="form-group">
          <label for="content" class="text-white">Content:</label>
          <textarea id="content" name="content" class="form-control form-control-lg" rows="6" required value={content} onChange={onChange} placeholder='Write your content here'></textarea>
        </div>
        <div className="form-group">
  <label htmlFor="post_image" className="text-white">Choose an Image to Uplaod <FaImage /></label>
  <div className="custom-file">
    <input type="file" className="custom-file-input" id="post_image" name="post_image" onChange={onChange} />
    <label className="custom-file-label" htmlFor="post_image"></label>
  </div>
</div>
        <button type="submit" class="btn btn-primary btn-lg btn-block">Submit</button>
        </form><br /><br />
        <AllUserPostFeedforUser />
      </div>
      <div className='feedpagemarket'>
        <FewMarketPlaceProducts />
      </div>
          </div>
            <Footer />
      <ToastContainer />
    </>
  );
}

export default Feedpage