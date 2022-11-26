import { Formik, useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import Button from '../common/Button';
import CheckBox from '../common/CheckBox';
import FieldGroup from '../common/FieldGroup';
import FormField from '../common/FormField';
import PageContentWrapper from '../common/PageContentWrapper'
import Title from '../common/Title'
import { useOpenMessage } from '../common/UserMessage';
import restService from '../utils/restService';

export default function UserProfile() {

  const userForm = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
      firstname: '',
      lastname: '',
      mail: ''
    },
    onSubmit: async (values) => {
      try {
        const res = await restService.put(`/api/v1/auth/usuarios/${userId || userData.user.id}`, values )
        openMessage('Usuario editado con éxito', true)
      } catch (e) {
        openMessage('Error al editar usuario', false)
      }
    }
  })

  const { userId } = useParams() 

  const userData = useSelector(store => store.authReducer);
  const [permissions, setPermissions] = useState([]);
  const [user, setUser] = useState();

  const openMessage = useOpenMessage()
  useEffect(() => {

    const searchUserAccesses = async () => {
      const res = await restService.post(`/api/v1/auth/usuarios/${userId || userData.user.id}/accesos`)

      setPermissions(res.data.data)
      
    }
    
    const searchUser = async () => {
      const res = await restService.get(`/api/v1/auth/usuarios/${userId || userData.user.id}`)
      const userRequest = res.data.data
      delete userRequest.password
      userForm.setValues(userRequest)
    }
    try {
      searchUser()
      searchUserAccesses()
     

    } catch (e) {
      openMessage('Error al buscar usuario', false)
    }

  }, [userId])

  const handleChange = (name, value) => {
    setPermissions(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
  const handleSubmitPermissions = () => {
    console.log(permissions)
  }


  return (
    <div className='m-10'>
      <Title title={'Usuario: '} />
      <PageContentWrapper>

        <FieldGroup>
          <FormField
            {...userForm.getFieldProps('username')}
            label={'Nombre de usuario'}
          />
          <FormField
            {...userForm.getFieldProps('password')}
            label={'Contraseña'}
          />
          <FormField
            {...userForm.getFieldProps('confirmPassword')}
            label={'Confirmación de contraseña'}
          />
        </FieldGroup>

        <FieldGroup>
          <FormField
            {...userForm.getFieldProps('firstname')}
            label={'Nombre'}

          />
          <FormField
            {...userForm.getFieldProps('lastname')}
            label={'Apellido'}

          />
        </FieldGroup>
        <FieldGroup>

          <FormField
            {...userForm.getFieldProps('mail')}
            label={'Mail'}

          />
        </FieldGroup>
        <Button onClick={userForm.handleSubmit}>Guardar</Button>
        {
          userData.permissions ? (
            userData.permissions.find(p => p.name == 'USUARIO_EDITAR') != null ? (

              <>
                <p className='text-xl mb-8'>Editor de permisos</p>
                {
                  permissions.map(p => <CheckBox handleChange={handleChange} label={p.name} id={p.id} value={permissions[p.id]} />)
                }
  
                <Button onClick={handleSubmitPermissions}>Guardar Permisos</Button>
              </>
            ) : ''
          ) : ''

        }
      </PageContentWrapper >
    </div >
  )
}
