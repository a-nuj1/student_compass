// ChangePass.jsx
import React, { useEffect, useState } from 'react';
import { Button, Container, Heading, Input, VStack } from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../redux/actions/profile'; 
import { toast } from 'react-hot-toast';

function ChangePass() {
    const [OldPassword, setOldPassword] = useState('');
    const [NewPassword, setNewPassword] = useState('');
    const dispatch = useDispatch();

    const { loading, message, error } = useSelector(state => state.profile || {}); // Add fallback

    const submitHandle = (e) => {
        e.preventDefault();
        dispatch(changePassword(OldPassword, NewPassword));
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({ type: 'clearError' });
        }
        if (message) {
            toast.success(message);
            dispatch({ type: 'clearMessage' });
        }
    }, [dispatch, error, message]);

    return (
        <Container py={'16'} minH={'90vh'}>
            <form onSubmit={submitHandle} >
                <Heading textTransform={'uppercase'}
                    my={'16'}
                    textAlign={['center', 'left']}
                >
                    Change Password
                </Heading>
                <VStack spacing={'8'}>
                    <Input
                        required
                        value={OldPassword}
                        onChange={e => setOldPassword(e.target.value)}
                        placeholder='Enter Old Password'
                        type='password'
                        focusBorderColor='yellow.500'
                    />
                    <Input
                        required
                        value={NewPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        placeholder='Enter New Password'
                        type='password'
                        focusBorderColor='yellow.500'
                    />
                    <Button isLoading={loading}
                        w={'full'} colorScheme='yellow'
                        type='submit'>
                        Change
                    </Button>
                </VStack>
            </form>
        </Container>
    );
}

export default ChangePass;
