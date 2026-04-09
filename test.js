import fs from 'fs';

async function testUpload() {
  const formData = new FormData();
  formData.append('name', 'TestFood');
  formData.append('description', 'TestDesc');
  formData.append('price', '10');
  formData.append('category', 'Salad');
  
  // Create a blob from dummy string
  const fileBlob = new Blob(['dummy image content'], { type: 'image/jpeg' });
  formData.append('image', fileBlob, 'dummy.jpg');

  try {
    const res = await fetch('http://localhost:4000/api/food/add', {
      method: 'POST',
      body: formData
    });
    const json = await res.json();
    console.log("SERVER RESPONSE:", json);
  } catch(e) {
    console.log("FETCH ERROR:", e);
  }
}

testUpload();
