const router = require('express').Router();
const {Commentaires,CommentaireUserRecipes} = require('../../db/models')

router.post('/', async (req, res) => {
  const {contenue , date , note, userId, recipeId} = req.body;

  try {

    const userRecipe = await CommentaireUserRecipes.create({
      userId,
      recipeId,
    });


    const newCommentaire = await Commentaires.create({
        contenue,
        note,
        date,
        userRecipeId : userRecipe.id
    });

    res.json(newCommentaire);
  } catch (err) {
    console.error(err);
  }
});

// Recupére tous les commentaires
router.get('/', async (req, res) => {
  try {
    const commentaires = await Commentaires.findAll();
    res.json(commentaires);
  } catch (err) {
    console.error(err);
  }
});


// Récuperer un commentaire par son id
router.get('/:id', async (req, res) => {
  const {id } = req.body;

  try {
 const commentaire = await Commentaires.findByPk(id );

    if(!commentaire){
      res.status(404).json({error: "Recette non trouvé"});
      return;
    }
    res.json(commentaire)
  
  } catch (err) {
    console.error(err);
    res.status(500).json({ error:' Erreur lors de la récupération de la recette'})
  }
});

router.put('/:id', async (req, res) => {
  const { id} = req.params;

  const {contenue , date , note} = req.body

  try {
 const commentaire = await Commentaires.findByPk(id);

    if(!commentaire){
      res.status(404).json({error: "Commentaire non trouvé"});
      return;
    }

    commentaire.contenue = contenue;
    commentaire.note = date;
    commentaire.date = note;

    await commentaire.save()

    res.json(commentaire)
  
  } catch (err) {
    console.error(err);
    res.status(500).json({ error:' Erreur lors de la modification de la recette'})
  }
});

router.delete('/:id', async (req, res) => {
  const { id} = req.params;

  try {
    const commentaire = await Commentaires.findByPk(id);
   
       if(!commentaire){
         res.status(404).json({error: "Commentaire non trouvé"});
         return;
       }
       await commentaire.destroy()
       res.json({ message: "Commentaire supprimé avec succés"})
     
     } catch (err) {
       console.error(err);
       res.status(500).json({ error:' Erreur lors de la suppression du commentaire'})
     }
   });


router.delete('/:id', async (req, res) => {
  const {id_recipe} = req.body;
  try {
    const commentaire = await Commentaires.findByPk(id );
   
       if(!commentaire){
         res.status(404).json({error: "Commentaire non trouvé"});
         return;
       }
       await commentaire.destroy()
       res.json({ message: "Commentaire supprimé avec succés"})
     
     } catch (err) {
       console.error(err);
       res.status(500).json({ error:' Erreur lors de la suppression du commentaire'})
     }
   });


module.exports = router;