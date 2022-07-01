import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,Spacer,
    Input, FormControl, Flex, Box,   
    InputLeftElement, InputGroup
  } from '@chakra-ui/react'
  import {HamburgerIcon,SearchIcon} from '@chakra-ui/icons'
  import * as React from "react"
const Navbar = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    return (  
        < Flex p='3vh 3vw' marginBottom='1vh' position='sticky' top={0} 
        backgroundColor='teal' zIndex={1}>
        <Box>
            Mdnaz Blog
        </Box>
        <Spacer/>
        <FormControl w={100}>
            <Input id='search' placeholder='Search...' color='teal' _placeholder={{ color: 'inherit' }} backgroundColor='gray.300'/>
        </FormControl>
          <HamburgerIcon ref={btnRef} onClick={onOpen} w='5vw' h='5vh' cursor='pointer' />
        <Drawer
          isOpen={isOpen}
          placement='top'
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay  />
          <DrawerContent h='50vh' paddingInline='5vw'>
            <DrawerCloseButton w='5vw' h='5vh'/>
            <DrawerHeader>mdnaz blog?</DrawerHeader>
  
            <DrawerBody display='flex' flexDirection='column' 
            justifyContent='center' alignItems='center'
            gap='2vh'>
              <a href="/">Home</a>
              <a href="#">Contact</a>
              <InputGroup w='auto'>
              <InputLeftElement children={<SearchIcon />} />
              <Input id='search' placeholder='Search...' w='30vw' />
              </InputGroup>
            </DrawerBody>
  
          </DrawerContent>
        </Drawer>
      </Flex>
    );
}
 
export default Navbar;
