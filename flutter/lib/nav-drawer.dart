import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';

class NavDrawer extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        children: <Widget>[
          DrawerHeader(
              child: Center(
                  child: Text(
                'COVID-19 Help',
                style: TextStyle(color: Colors.white, fontSize: 28),
              )),
              decoration: BoxDecoration(
                  color: Colors.green,
                  image: DecorationImage(
                      fit: BoxFit.fill,
                      image: AssetImage('assets/images/Untitled-1~2.png')))),
          ListTile(
            leading: Icon(Icons.map, color: Colors.green),
            title: Text('Hostspots Tracker'),
          ),
          ListTile(
              leading: Icon(Icons.dashboard, color: Colors.red),
              title: Text('Statistics')),
          ListTile(
            leading: Icon(Icons.message, color: Colors.blue),
            title: Text('AI Chat Bot'),
          ),
          ListTile(
            leading: Icon(Icons.person, color: Colors.black),
            title: Text('About Us'),
          )
        ],
      ),
    );
  }
}
