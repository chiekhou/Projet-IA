import styles from './Register.module.scss'
import { useForm} from 'react-hook-form'
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import { createUser } from '../../apis/users';


function Register(){
    const validationSchema = yup.object({
        lastName: yup.string().required('Renseigner votre nom').min(3, 'Avec plus de 3 caractéres'),
        firstName: yup.string().required('Renseigner votre prénom').min(3, 'Avec plus de 3 caractéres'),
        email: yup.string().required('Renseigner votre email').email( "L'email n'est pas valide"),
        password: yup.string().required('Renseigner votre mot de passe').min(6, 'Mot de passe trop court')
    })

    const initialValues = {
        firstName: '',
        lastName :'',
        email: '',
        password:''
    }

    const { handleSubmit , register , formState: {errors, isSubmitting}, setError, clearErrors} = useForm({
        initialValues,
        resolver: yupResolver(validationSchema)
    });

    const submit = handleSubmit((credentials) => {
        console.log(credentials);
        try {
            clearErrors()
            const user = createUser(credentials);
            
        } catch(message){
            setError("generic", {type: "generic", message})
        }
    })


    return   (
    <div className="flex-fill d-flex align-items-center justify-content-center">
    <form onSubmit={submit} className={`${styles.form} d-flex flex-column card p-20`}>
        <h2 className="mb-10"> Register</h2>
        <div className="mb-10 d-flex flex-column">
            <label htmlFor='firstName'>Prénom</label>
        <input type="text" name="firstName" {...register('firstName')}/>
        {errors.firstName && <p className='form-error'>{errors.firstName.message}</p>}
        </div>
        <div className="mb-10 d-flex flex-column">
            <label htmlFor='lastName'>Nom</label>
        <input type="text" name="lastName" {...register('lastName')}/>
        {errors.lastName && <p className='form-error'>{errors.lastName.message}</p>}
        </div>
        <div className="mb-10 d-flex flex-column">
            <label htmlFor='email'>Email</label>
        <input type="text" name="email" {...register('email')}/>
        {errors.email && <p className='form-error'>{errors.email.message}</p>}
        </div>
        <div className="mb-10 d-flex flex-column">
            <label htmlFor='password'>Password</label>
        <input type="password" name="password" {...register('password')}/>
        {errors.password && <p className='form-error'>{errors.password.message}</p>}
        </div>
        {errors.generic&& <p className='form-error'>{errors.generic.message}</p>}
        <div>
        <button disabled={isSubmitting} className='btn btn-primary'>Inscription</button>
        </div>
    </form>
    </div>
    )
}

export default Register