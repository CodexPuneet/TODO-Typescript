import React, { ReactNode } from 'react';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  Center,
  MenuItem,
  MenuList,
  Image,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiMenu,
  FiChevronDown,
} from 'react-icons/fi';
import { useProvider } from "../Context/Provider";
import { IconType } from 'react-icons';
import { useNavigate } from "react-router";
import { ReactText } from 'react';

interface LinkItemProps {
  name: string;
  icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome },
  { name: 'ToDos', icon: FiTrendingUp },
  { name: 'Pending', icon: FiCompass },
  { name: 'Milestone', icon: FiStar },
];

export default function Navbar({
  children,
}: {
  children: ReactNode;
}) {

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen}  />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
        
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={'#db4c3f'}
      color={'white'}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex  h="40" alignItems="center" mx="8" justifyContent="space-between">
        <Center>

       
        <Image w={{ base: '50%', md: '80%' }} h='80%' m='10px' src='https://media.licdn.com/dms/image/C560BAQGjQAkAPXIlsw/company-logo_200_200/0/1675923454567?e=1686787200&v=beta&t=cZf6e4CF_GFILrl31i78NJckvGKP3dAZvOltPrSm0M4' />
        </Center>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none'  }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        type="submit"
        
              
        _hover={{
          bgGradient: 'linear(to-r, red.400,pink.400)',
          boxShadow: 'xl',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const navigate = useNavigate();
  const { user, getUser, logout } = useProvider();
  

  const handleLogout=()=>{
    logout()
    navigate('/')
  }
  const handleHome=()=>{
    navigate('/homepage')
  }
  
React.useEffect(()=>{
  getUser()
},[])


  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"

      color={'white'}
       bg={useColorModeValue('#B25B7E', '#e8f0fe')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        Hypothesize Manager
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    'https://lh3.googleusercontent.com/a/AGNmyxbZmPjUGu0UcVzVxDHQ3fP12UoXmx1z6CzvXfL8CQ=s96-c-rg-br100'
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">{user?.name}</Text>     
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('gray.200', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
            <MenuItem color='pink.400' onClick={handleHome}>HomePage</MenuItem>
              <MenuItem color='red' onClick={handleLogout}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

