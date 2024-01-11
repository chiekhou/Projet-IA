const router = require('express').Router();
const {Preferences} = require('../../db/models')
const authMiddleware = require('../../middleware');

router.post('/',authMiddleware, async (req, res) => {
  const { id_user } = req.user;
  const {allergies , medicalConditions,regimeAlimentaire, autre } = req.body;

  try {
    const newPreference = await Preferences.create({
        allergies,
        medicalConditions,
        regimeAlimentaire,
        autre,
        userId :id_user 
    });

    res.json(newPreference);
  } catch (err) {
    console.error(err);
  }
});



// Recupére toutes les préferences
router.get('/',authMiddleware, async (req, res) => {
  const { id_user } = req.user;
  try {
    const preferences = await Preferences.findAll({
      where: {
        userId: id_user,
      },
    });
    res.json(preferences);
  } catch (err) {
    console.error(err);
  }
});


// Récuperer une preference par son id
router.get('/:id', authMiddleware, async (req, res) => {
  const {id } = req.body;

  try {
 const preference = await Preferences.findByPk(id );

    if(!preference){
      res.status(404).json({error: "Preference non trouvé"});
      return;
    }
    res.json(preference)
  
  } catch (err) {
    console.error(err);
    res.status(500).json({ error:' Erreur lors de la récupération de la preference'})
  }
});

router.patch('/:id_preference', authMiddleware ,async (req, res) => {

  const { id_user } = req.user;
  const { id_preference} = req.params;
  const { allergies,medicalConditions,regimeAlimentaire,autre} = req.body

  try {
 const preference = await Preferences.findByPk(id_preference);

    if(!preference){
      res.status(404).json({error: "Preference non trouvé"});
      return;
    }

    preference.allergies=allergies;
    preference.medicalConditions = medicalConditions;
    preference.regimeAlimentaire = regimeAlimentaire;
    preference.autre =autre
    preference.userId = id_user;

    await preference.save()

    res.json(preference)
  
  } catch (err) {
    console.error(err);
    res.status(500).json({ error:' Erreur lors de la modification de vos préferences'})
  }
});

router.delete('/:id_preference',authMiddleware ,async (req, res) => {
  const {id_preference} = req.params;
  try {
    const preference = await Preferences.findByPk(id_preference);
   
       if(!preference){
         res.status(404).json({error: "Preference non trouvé"});
         return;
       }
       await preference.destroy()
       res.json({ message: "Preference supprimé avec succés"})
     
     } catch (err) {
       console.error(err);
       res.status(500).json({ error:' Erreur lors de la suppression de vos préferences'})
     }
   });



module.exports = router;