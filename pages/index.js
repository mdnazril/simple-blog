import Head from 'next/head'
import Navbar from '../components/navbar'
import { Box, Button, Text, Image } from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import sanityClient from '../client';
import imageUrlBuilder  from "@sanity/image-url";


export default function Home({posts}) {

  const [allPost, setAllPost] = useState([]);
  useEffect(()=>{
    if(posts.length){
      const imgBuilder = imageUrlBuilder(sanityClient)
      console.log(imgBuilder);
      setAllPost(
        posts.map(p =>{
          return{
            ...p,
            mainImage: imgBuilder.image(p.mainImage).width(500).height(250),
          }
        })
      )
    }else{
      setAllPost([]);
    }
  },[posts])

  return (
   <>
   <Navbar />
   <Box>
      <Box>
        {allPost.length ? allPost.map((p, index)=>(
          <Box key={index} w='70vw' maxW='700px' marginInline='auto' marginBottom={5} p='1vh 1vw'>
            <Image src={p.mainImage} borderRadius='10px'/>
            <Text className='title' paddingInline='5px'>{p.title}</Text>
            <Button> <a href={`/post/${p.slug.current}`}>Read More</a> </Button>
            {/* <Text>{p.author}</Text> */}
          </Box>
        )) : <>No post</>}
      </Box>
   </Box>
   </>
  )
}

export const getServerSideProps = async pageContext =>{
  const query = encodeURIComponent('*[ _type == "post" ]');
  const url = `https://m74dnjxr.api.sanity.io/v1/data/query/production?query=${query}`;
  const result = await fetch(url).then(res =>res.json());

  if (!result.result || !result.result.length){
    return {
      props: {
        posts: []
      }
    }
  }else{
    return {
      props:{
        posts: result.result
      }
    }
  }
}