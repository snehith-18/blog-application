import './DedicatedBlog.css';
import Banner from '../../Components/Banner/Banner';
import { useState, useEffect } from 'react';
import blogs from '../../Utils/MockData';
import { useParams } from 'react-router-dom';

function DedicatedBlog() {
    const [blogID, setBlogID] = useState(2)
    let blogToDisplay = blogs.filter(blog => blog.id == blogID)[0]
    const { id } = useParams()
    useEffect(() => {
             if(id) {
            {
                  setBlogID(id);
                  fetch('http://localhost:3000/blog/GetBlog/'+ id)
            .then(data =>{
               return data.json() 
            }) 
           
            .then(data => {
                console.log('Line 20 Data From Server: ',data);
            })

            }
        }
    }, [])

    return (
        <>
            <Banner />
            <h1>{blogToDisplay.title}</h1>
            <h6>{blogToDisplay.category}</h6>
            <p>{blogToDisplay.content}</p>
        </>
    )
}
export default DedicatedBlog;