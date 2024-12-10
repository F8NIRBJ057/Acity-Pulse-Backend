const router = require("express").Router()
const {getAllEvents, createEvent, confirmRsvp} = require("../controllers/eventsController")

router.get("/allevents",getAllEvents)
router.post("/createevent", createEvent)
router.post("/confirmrsvp", confirmRsvp)
module.exports = router
