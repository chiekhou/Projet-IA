import styles from "./UserPreferenceForm.module.scss";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createPreference, updatePreference} from "../../../../../../apis/preference";
import { useLoaderData, useNavigate } from "react-router-dom";

function UserPreferenceForm() {
  const preference = useLoaderData();
  const navigate = useNavigate();

  const defaultValues = {
    allergies: preference ? preference.allergies : "",
    medicalConditions: preference ? preference.medicalConditions : "",
    regimeAlimentaire: preference ? preference.regimeAlimentair : "",
    autre: preference ? preference.autre : "",
  };

  const preferenceSchema = yup.object({
    allergies: yup
      .string()
      .required("Votre allergie doit être renseigné")
      .min(10, "Votre allergie doit être explicite")
      .max(30, "Votre allergie être succinct"),
      medicalConditions: yup
      .string()
      .required("Vos conditions medicale doit être renseigné")
      .min(10, "Vos conditions medicale doit être explicite")
      .max(30, "Vos conditions medicale être succinct"),

      regimeAlimentaire: yup
      .string()
      .required("Votre regimeAlimentaire doit être renseigné")
      .min(10, "Votre regimeAlimentaire doit être explicite")
      .max(30, "Votre regimeAlimentaire être succinct"),

      autre: yup
      .string()
      .required("Qu'av doit être renseigné")
      .min(10, "Dites nous en plus")
      .max(30, "Prennons rendez vous"),
  });

  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
  } = useForm({
    defaultValues,
    resolver: yupResolver(preferenceSchema),
  });

  async function submit(values) {
    try {
      clearErrors();
      if (preference) {
        await updatePreference({
          ...values,
          id_preference: preference.id_preference,
        });
        navigate("/profile/preference/list");
      } else {
        await createPreference(values);
        reset(defaultValues);
      }
    } catch (e) {
      setError("generic", { type: "generic", message: "Il y a eu une erreur" });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className={`d-flex flex-column card p-20 ${styles.preferenceForm}`}
    >
      <h2 className="mb-20">Ajouter vos préferences</h2>
      <div className="d-flex flex-column mb-20">
        <label>Allergies</label>
        <input {...register("allergies")} type="text" />
        {errors.allergies && <p className="form-error">{errors.allergies.message}</p>}
      </div>
      <div className="d-flex flex-column mb-20">
        <label>Régime Alimentaire</label>
        <input {...register("regimeAlimentaire")} type="text" />
        {errors.regimeAlimentaire && <p className="form-error">{errors.regimeAlimentaire.message}</p>}
      </div>
      <div className="d-flex flex-column mb-20">
        <label>Conditions Médical</label>
        <input {...register("medicalConditions")} type="text" />
        {errors.medicalConditions && <p className="form-error">{errors.medicalConditions.message}</p>}
      </div>
      <div className="d-flex flex-column mb-20">
        <label>Autre</label>
        <input {...register("autre")} type="text" />
        {errors.autre && <p className="form-error">{errors.autre.message}</p>}
      </div>
      {errors.generic && <p className="form-error">{errors.generic.message}</p>}
      <div>
        <button disabled={isSubmitting} className="btn btn-primary">
          Sauvegarder
        </button>
      </div>
    </form>
  );
}

export default UserPreferenceForm;
