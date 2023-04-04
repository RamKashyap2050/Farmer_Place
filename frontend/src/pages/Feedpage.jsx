
import React, {useState} from 'react';
import HeaderforUser from '../components/HeaderforUser';
import Footer from '../components/Footer'
import '../styles/Feedpage.css'


const Feedpage = () => {

  return (
    <>
    <HeaderforUser />
    <form action="#" method="POST" enctype="multipart/form-data" className='form'>
  <div class="form-group">
    <label for="title" class="text-white">Title:</label>
    <input type="text" id="title" name="title" class="form-control form-control-lg" required />
  </div>
  <div class="form-group">
    <label for="content" class="text-white">Content:</label>
    <textarea id="content" name="content" class="form-control form-control-lg" rows="6" required></textarea>
  </div>
  <div class="form-group">
    <label for="image" class="text-white">Image:</label>
    <input type="file" id="image" name="image" class="form-control-file" />
  </div>
  <button type="submit" class="btn btn-primary btn-lg btn-block">Post</button>
</form>
      <Footer />
    </>
  );
}

export default Feedpage