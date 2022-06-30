import { Box, Image } from "@chakra-ui/react";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder  from "@sanity/image-url";
import { useState, useEffect } from "react";
import sanityClient from '/client'
import Navbar from '/components/navbar.js'

export const Post = ({body, title, image}) =>{
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const imgBuilder = imageUrlBuilder(sanityClient);
    
        setImageUrl(imgBuilder.image(image));
      }, [image]);

    return(
    <>
    <Navbar />
    <Box marginInline='auto' w='80vw'>
        <h1 className="title">{title}</h1>
        {imageUrl && <Image src={imageUrl} alt=" " w='70vw' maxW='700px' h='40vh' marginY='2.5vh'/>}
        <div >
            <PortableText value={body} className="textBody"/>
        </div>
    </Box>
    </>
    );
};

export const getServerSideProps = async pageContext =>{
    const pageSlug = pageContext.query.slug;
    
    if(!pageSlug){
        return {
            notFound: true
        }
    }
    const query = encodeURIComponent(`*[ _type == "post" && slug.current == "${pageSlug}" ]`);
    const url = `https://m74dnjxr.api.sanity.io/v1/data/query/production?query=${query}`;

    const result = await fetch(url).then(res => res.json());
    const post = result.result[0];

    if (!post){
        return {
            notFound: true
        } 
    }else {
        return{
            props:{
                body: post.body,
                title: post.title,
                image: post.mainImage
            }
        }  
    }
};

export default Post;