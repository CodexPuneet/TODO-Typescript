import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  IconProps,
  Icon,
} from '@chakra-ui/react';
import { FormEvent, useState,useEffect } from 'react';
import { useProvider } from "../Context/Provider";
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';

const avatars = [
  {
      name: 'Sourav Biswas',
      url: 'https://media.licdn.com/dms/image/C4E03AQE13505PqHpUA/profile-displayphoto-shrink_400_400/0/1599854697445?e=1683763200&v=beta&t=eovtWDbNQzgj9EDZn9MJ9Sw-n9H_QwwW9mHltGFWlBY',
    },
    {
      name: 'Hypothesize',
      url: 'https://media.licdn.com/dms/image/C560BAQGjQAkAPXIlsw/company-logo_100_100/0/1675923454567?e=1686182400&v=beta&t=XY9Q7C2ukcaSo0X34EiPQ4Vpgrasu-baEi7uB1-sVtk',
    },
  {
    name: 'Puneet Srivastava',
    url: 'https://lh3.googleusercontent.com/a/AGNmyxbZmPjUGu0UcVzVxDHQ3fP12UoXmx1z6CzvXfL8CQ=s96-c-rg-br100',
  },
  {
      name: 'Hypothesize',
      url: 'https://media.licdn.com/dms/image/C560BAQGjQAkAPXIlsw/company-logo_100_100/0/1675923454567?e=1686182400&v=beta&t=XY9Q7C2ukcaSo0X34EiPQ4Vpgrasu-baEi7uB1-sVtk',
    },
 
  {
    name: 'Puneet Srivastava',
    url: 'https://lh3.googleusercontent.com/a/AGNmyxaUx0GjZjGo0m86n-YnsjS3zwIsddi2crpRm0NS=s96-c-rg-br100',
  }
];

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail]=useState("")
  const [password, setPassword]=useState("")
  const [name, setName]=useState("")
  const [phone, setPhone]=useState("")
  const { user, registerUser } = useProvider();

  const handleData = (e: FormEvent) => {
    e.preventDefault();
    registerUser({ email,password,name,phone});
  };
 


  useEffect(() => {
    if (!user) return navigate("/register");
  }, [user]);

  

  return (
    <Box position={'relative'}>
      <Container
        as={SimpleGrid}
        maxW={'7xl'}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}>
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}>
           Hypothesize Professional {' '}
            <Text
              as={'span'}
              bgGradient="linear(to-r, red.400,pink.400)"
              bgClip="text">
              &
            </Text>{' '}
            Modern <Text
              as={'span'}
              bgGradient="linear(to-r, red.400,pink.400)"
              bgClip="text">
              TO-DO
            </Text>{' '} Manager
          </Heading>
          <Stack direction={'row'} spacing={4} align={'center'}>
            <AvatarGroup>
              {avatars.map((avatar) => (
                <Avatar
                  key={avatar.name}
                  name={avatar.name}
                  src={avatar.url}
                   size={({ base: 'md', md: 'lg' })}
                  position={'relative'}
                  zIndex={2}
                  _before={{
                    content: '""',
                    width: 'full',
                    height: 'full',
                    rounded: 'full',
                    transform: 'scale(1.125)',
                    bgGradient: 'linear(to-bl, red.400,pink.400)',
                    position: 'absolute',
                    zIndex: -1,
                    top: 0,
                    left: 0,
                  }}
                />
              ))}
            </AvatarGroup>
            <Text fontFamily={'heading'} fontSize={{ base: '4xl', md: '6xl' }}>
              +
            </Text>
            <Flex
              align={'center'}
              justify={'center'}
              fontFamily={'heading'}
              fontSize={{ base: 'sm', md: 'lg' }}
              bg={'gray.800'}
              color={'white'}
              rounded={'full'}
              minWidth={useBreakpointValue({ base: '44px', md: '60px' })}
              minHeight={useBreakpointValue({ base: '44px', md: '60px' })}
              position={'relative'}
              _before={{
                content: '""',
                width: 'full',
                height: 'full',
                rounded: 'full',
                transform: 'scale(1.125)',
                bgGradient: 'linear(to-bl, orange.400,yellow.400)',
                position: 'absolute',
                zIndex: -1,
                top: 0,
                left: 0,
              }}>
              YOU
            </Flex>
          </Stack>
        </Stack>
        <Stack
          bg={'gray.50'}
          rounded={'xl'}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: 'lg' }}>
          <Stack spacing={4}>
            <Heading
              color={'gray.800'}
              lineHeight={1.1}
              fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
              Try Our Product{' '}
              <Text
                as={'span'}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text">
                !
              </Text>
            </Heading>
            <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
             We've build an outstanding TO-Do Manager, To Organise your   <Text
                as={'span'}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text">
                Daily
              </Text> Tasks.
            </Text>
          </Stack>
          <Box as={'form'} onSubmit={handleData} mt={10}>
            <Stack spacing={4}>
            <Input
                placeholder="Enter Your Name "
                required
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                type="text"
                name="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                _placeholder={{
                  color: 'gray.500',
                }}
              />
              <Input
                placeholder="Enter Your Email"
                required
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              _placeholder={{
                  color: 'gray.500', 
                }}
              />
              <Input
                placeholder="Enter Your Password "
                required
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                _placeholder={{
                  color: 'gray.500',
                }}
              />
               <Input
                placeholder="Enter Your Phone No."
                required
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                type="number"
                name="phone"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                _placeholder={{
                  color: 'gray.500',
                }}
              />
           
            </Stack>
            <Button
              fontFamily={'heading'}
              mt={8}
              w={'full'}
              type="submit"
              bgGradient="linear(to-r, red.400,pink.400)"
              color={'white'}
              
              _hover={{
                bgGradient: 'linear(to-r, red.400,pink.400)',
                boxShadow: 'xl',
              }}>
              Submit
            </Button>

            <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
             Already Member ?   <Text
                as={'span'}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text">
                <Link to="/">
                Click Here
                </Link> 
              </Text>
            </Text>
          </Box>
        </Stack>  
      </Container>
      <Blur
        position={'absolute'}
        top={-10}
        left={-10}
        style={{ filter: 'blur(70px)' }}
      />
    </Box>
  );
}

export const Blur = (props: IconProps) => {
  return (
    <Icon
      width={useBreakpointValue({ base: '100%', md: '40vw', lg: '30vw' })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};