// dashboard home page
async function dashboard_page(req, res) {
  try {
    res.render("dashboard/index");
  } catch (error) {
    res.status(500).json({ error });
  }
}

module.exports = {
  dashboard_page
};
