const express = require('express');
const router = new express.Router();
router.use(express.json());
const { Counter, Board } = require('../model/Boardsschema');

router.post('/boards', (req, res) => {
    try {
        const checkStage = req.body.stage;
        if (checkStage == 1 || checkStage == 2 || checkStage == 3) {
            Counter.findOneAndUpdate(
                { id: 'autoval' },
                { '$inc': { "seq": 1 } },
                { new: true }, (err, cd) => {
                    // console.log("counter value", cd);
                    let seqId;
                    if (cd == null) {
                        const newVal = new Counter({
                            id: 'autoval', seq: 1
                        })
                        newVal.save();
                        seqId = 1;
                    }
                    else {
                        seqId = cd.seq;
                    }
                    const data = new Board({
                        id: seqId,
                        title: req.body.title,
                        stage: req.body.stage
                    })
                    data.save();
                }
            )
            res.status(200).send("Created");
        } else {
            res.status(400).send('Invalid Stage')
        }

    } catch (error) {
        res.send(`the error in POST that is : ${error} `);
    }
})

router.put('/boards/:id', async (req, res) => {
    try {
        const checkStage = req.body.stage;
        if (checkStage == 1 || checkStage == 2 || checkStage == 3 || checkStage == undefined) {
            const id = req.params.id;
            const update = await Board.findOneAndUpdate({ id: id }, req.body, { new: true });
            res.status(200).send(update);
        }
        else { res.status(400).send('invalid Stage'); }
    } catch (error) {
        res.status(400).send(`error in PUT that is : ${error}`);
    }
})



module.exports = router;