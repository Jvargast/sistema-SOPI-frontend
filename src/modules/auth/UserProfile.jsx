import { Formik, useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
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
        const res = await restService.put(`/api/v1/auth/usuarios/${userId || userData.user.id}`, values)
        openMessage('Usuario editado con éxito', true)
        setSubmit(false);
      } catch (e) {
        openMessage('Error al editar usuario', false)
        setSubmit(false);
      }
    },
    validate: (values) => {
      let errors = null;
      console.log(values.password, values.confirmPassword)
      if (values.password.length > 0 && values.password.length < 6) {
        errors = {}
        errors.password = 'La contraseña debe tener más de 6 carácteres'
      }
      if (values.password != values.confirmPassword) {
        if (!errors) {

          errors = {}
        }
        errors.confirmPassword = 'Las contraseñas no coinciden'
      }
      if (values.username <6) {
        if (!errors) {

          errors = {}
        }
        errors.username = 'El nombre de usuario debe tener mínimo 6 carácteres'
      }


      return errors;
    }
  })

  const { userId } = useParams()

  const navigate = useNavigate()

  const [submit, setSubmit] = useState(false)

  const userData = useSelector(store => store.authReducer);
  const [availablePermissions, setAvailablePermissions] = useState([]);
  const [currentProfilePermissions, setCurrentProfilePermissions] = useState([]);
  const [userPermissions, setUserPermissions] = useState([]);
  const [appPermissions, setAppPermissions] = useState([]);

  const [user, setUser] = useState({});



  const openMessage = useOpenMessage()


  useEffect(() => {


    const calculatePermissions = async () => {
      let res = await restService.get(`/api/v1/auth/perfiles/${user.profile.id}`);
      const pp = res.data.data.permisos;
      setCurrentProfilePermissions(pp);

      res = await restService.get(`/api/v1/auth/usuarios/${userId || userData.user.id}/accesos`)
      const up = res.data.data;
      setUserPermissions(up);
      console.log('User permissions ', up)

      res = await restService.get(`/api/v1/auth/permisos`);
      const ap = res.data.data;
      setAppPermissions(ap);

      setAvailablePermissions((prev) => {
        const tempPermissions = ap.filter((p) => {
          return pp.find(pp => pp.permisoId == p.id) == null
        });

        return tempPermissions.map(p => {
          return {
            ...p,
            checked: (up.find(upp => {
              return upp.permissionId == p.id
            }) != null)
          }
        })
      });
    }

    if (userData && userData.permissions && userData.permissions.find(p => p.name == 'USUARIO_EDITAR')) {
      console.log('Calculando permisos', setCurrentProfilePermissions.length, userPermissions.length, appPermissions.length)
      calculatePermissions()
    }
  }, [userData.permissions, userData, user])

  useEffect(() => {


    const searchUser = async () => {
      try {
        
        const res = await restService.get(`/api/v1/auth/usuarios/${userId || userData.user.id}`)
        const userRequest = res.data.data
        delete userRequest.password
        setUser(userRequest)
        userForm.setValues(values => {
          console.log('valus', values)
          return {
            ...values,
            ...userRequest
          }
        })
        
        
      } catch (e) {
        openMessage('Error al buscar usuario', false)
        navigate('/home')
      }
    }
    searchUser()

  }, [userId])

  const handleChange = (name, value) => {
    setAvailablePermissions(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
  const handleSubmitPermissions = async () => {

  let newAccesses = availablePermissions.filter(p => p.checked)

  newAccesses = newAccesses.map( p => {
      if (p.checked) {
        return {
          id: p.id
        }
      }
    })
    console.log(newAccesses)
    try {
      const res = await restService.put(`/api/v1/auth/usuarios/${user.id}/accesos`, {newAccesses})
      openMessage('Permisos actualizados con éxito', true)
    } catch (e) {
      openMessage('Error al actualizar permisos', false)
    }
  }


  return (
    <div className='m-10'>
      <Title title={`Usuario:   ${userForm.values.firstname}  ${userForm.values.lastname}`} />
      <PageContentWrapper>

        <FieldGroup>
          <FormField
            {...userForm.getFieldProps('username')}
            error={userForm.touched.username ? userForm.errors.username : ''}
            label={'Nombre de usuario'}
            />
          <FormField
            {...userForm.getFieldProps('password')}
            label={'Contraseña'}
            error={userForm.touched.password ? userForm.errors.password : ''}
            />
          <FormField
            {...userForm.getFieldProps('confirmPassword')}
            error={userForm.touched.confirmPassword ? userForm.errors.confirmPassword : ''}
            label={'Confirmación de contraseña'}
            />
        </FieldGroup>

        <FieldGroup>
          <FormField
            {...userForm.getFieldProps('firstname')}
            error={userForm.touched.firstname ? userForm.errors.firstname : ''}
            label={'Nombre'}
            
            />
          <FormField
            {...userForm.getFieldProps('lastname')}
            error={userForm.touched.lastname ? userForm.errors.lastname : ''}
            label={'Apellido'}
            
            />
        </FieldGroup>
        <FieldGroup>

          <FormField
            error={userForm.touched.mail? userForm.errors.mail : ''}
            {...userForm.getFieldProps('mail')}
            label={'Mail'}

          />
        </FieldGroup>
        <Button onClick={() => {
          setSubmit(true);
          userForm.handleSubmit();
          

        }}>Guardar</Button>
        {
          userData.permissions ? (
            userData.permissions.find(p => p.name == 'USUARIO_EDITAR') != null ? (

              <>
                <p className='text-xl mb-8'>Editor de permisos</p>
                {
                  availablePermissions.map(p => {
                    return (<CheckBox check={p.checked} handleChange={() => {
                      p.checked = !p.checked
                    }} label={p.name} id={p.id} value={availablePermissions[p.id]} />)
                  })
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
