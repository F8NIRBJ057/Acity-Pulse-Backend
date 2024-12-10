const pool = require("../config/db")

const getAllEvents = async (req, res) => {
    try {
      const events = await pool.query("SELECT * FROM events");
      return res.status(200).json({ events: events.rows });
    } catch (error) {
      console.error("Error fetching events:", error);
      return res.status(500).json({ error: "Error fetching events" });
    }
  };

  const createEvent = async (req, res) => {
    const { name, description, event_date, event_time, location, capacity, available_seats, type, created_by } = req.body;
    if (!name || !description || !event_date || !event_time || !location || !capacity || !available_seats || !type || !created_by) {
      return res.status(400).json({ error: "All fields are required" });
    }
    try {
      const newEvent = await pool.query("INSERT INTO events (name, description, event_date, event_time, location, capacity, available_seats, type, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *", [name, description, event_date, event_time, location, capacity, available_seats, type, created_by]);
      return res.status(201).json({ msg: "Event created successfully" });
    } catch (error) {
      console.error("Error creating event:", error);
      return res.status(500).json({ error: "Error creating event" });
    }
  };

  const confirmRsvp = async (req, res) => {
    let { event_id, user_id } = req.body;
    console.log(`event_id: ${event_id} || user_id: ${user_id}`);
  
    if (!event_id || !user_id) {
      console.log("Event ID and user ID are required");
      return res.status(400).json({ error: "Event ID and user ID are required" });
    }
    
    try {  
      const event = await pool.query("SELECT * FROM events WHERE id = $1", [
        event_id,
      ]);
      if (event.rows[0].available_seats === 0) {
        return res.status(400).json({ error: "Event is already full" });
      }
  
      const existingRsvp = await pool.query(
        "SELECT * FROM rsvps WHERE event_id = $1 AND user_id = $2",
        [event_id, user_id]
      );
      if (existingRsvp.rows.length > 0) {
        return res
          .status(400)
          .json({ error: "User has already RSVP'd for this event" });
      }
  
      await pool.query("INSERT INTO rsvps (event_id, user_id) VALUES ($1, $2)", [
        event_id,
        user_id,
      ]);
      await pool.query(
        "UPDATE events SET available_seats = available_seats - 1 WHERE id = $1",
        [event_id]
      );
      console.log("RSVP confirmed successfully");
      return res.status(200).json({ msg: "RSVP confirmed successfully" });
    } catch (error) {
      console.error("Error confirming RSVP:", error);
      return res.status(500).json({ error: "Error confirming RSVP" });
    }
  };
  



  module.exports = {getAllEvents, createEvent, confirmRsvp}