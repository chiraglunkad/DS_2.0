var express = require('express');
var router = express.Router();
var db = require('../dbconnection');

/* GET home page. */
router.get('/getMenus/:user_id', async function (req, res) {

  db.multi(`SELECT MENUMAP.MENU_ID,MENU.NAME,MENU.METHODNAME,MENU.METHODPARAMETER,MENU.IS_DEFAULT,MENU.MENU_CODE,MENU.route ,MENU.type,
  MENU.NAME_HINDI,PARENTMENU.MENU_ID PARENT_MENU_ID,PARENTMENU.MENU_CODE PARENTCODE,PARENTMENU.NAME PARENTNAME
  FROM M_USER_DEPT_MENU_MAP MENUMAP,M_MENU_MST MENU,M_MENU_MST PARENTMENU
  WHERE MENUMAP.USER_ID = $1
  AND strpos('310', MENUMAP.DEPT_ID::character varying ) > 0 AND MENU.IS_DEFAULT='N'
  AND MENUMAP.MENU_ID=MENU.MENU_ID AND MENU.PARENT_MENU_ID=PARENTMENU.MENU_ID
  UNION
  SELECT MENU.MENU_ID,MENU.NAME,MENU.METHODNAME,MENU.METHODPARAMETER,MENU.IS_DEFAULT,MENU.MENU_CODE,MENU.route ,MENU.type,
  MENU.NAME_HINDI,PARENTMENU.MENU_ID PARENT_MENU_ID,PARENTMENU.MENU_CODE PARENTCODE,PARENTMENU.NAME PARENTNAME
  FROM M_MENU_MST MENU ,M_MENU_MST PARENTMENU
  WHERE  MENU.IS_DEFAULT='Y'  AND MENU.PARENT_MENU_ID=PARENTMENU.MENU_ID`, [req.params.user_id])
    .then(function (data) {
      res.json(data[0]);
    })
    .catch(function (error) {
      console.log('ERROR:', error)
    });
  // var result = await db.multi(`select * from mas_district md where md.scode = $1`, [req.params.id]);
  // res.json(result);

});

module.exports = router;
