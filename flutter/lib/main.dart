import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'nav-drawer.dart';
import 'map.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'stats.dart';
import 'chat.dart';
import 'report.dart';

void main() => runApp(MyApp());

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(title: 'COVID-19 Help', home: HomeScreen());
  }
}

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: SingleChildScrollView(
            child: Column(
      children: <Widget>[
        Container(
            height: 350,
            width: double.infinity,
            decoration: BoxDecoration(
                gradient:
                    LinearGradient(colors: [Colors.blue.shade200, Colors.blue.shade300,Colors.blue.shade400],),
                    
                image: DecorationImage(
                    image: AssetImage('assets/images/virus.png')))),
        Container(
          height: 200,
          width: double.infinity,
          alignment: Alignment.center,
          child: Column(children: <Widget>[
            Padding(
                padding: EdgeInsets.only(top: 20),
                child: Text('COVID-19 Help', style: TextStyle(fontSize: 48))),
            Padding(
                padding: EdgeInsets.only(top: 20),
                child: Text(
                  'Stay Home, Stay Safe',
                  style: TextStyle(fontSize: 24),
                ))
          ]),
        ),
        Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: <Widget>[
            NavCardWidget(
                image: 'assets/images/location.png',
                option: 'COVID-19 Hotspots',
                optDesc:
                    'Locate COVID-19 Hotspots near you and track essential services',
                route: MapRoute()),
            NavCardWidget(
                image: 'assets/images/ai-chat.png',
                option: 'Your COVID Assistant',
                optDesc: 'Chat with our AI Bot to answer your COVID queries',
                route: ChatsRoute()),
            NavCardWidget(
                image: 'assets/images/help.png',
                option: 'Report',
                optDesc:
                    'Report your inconvinences and complaints to local authorities',
                route: ReportRoute())
          ],
        )
      ],
    )));
  }
}

class NavCardWidget extends StatelessWidget {
  final String option;
  final String image;
  final StatelessWidget route;
  final String optDesc;

  NavCardWidget({this.option, this.image, this.route, this.optDesc});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
        height: 280,
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: 20, vertical: 10),
          child: Card(
            elevation: 5,
            child: InkWell(
                onTap: () {
                  print('Tapped');
                  Navigator.push(context,
                      MaterialPageRoute(builder: (context) => this.route));
                },
                child: Stack(children: <Widget>[
                  Ink.image(
                    image: AssetImage(this.image),
                    fit: BoxFit.cover,
                    child: Container(),
                  ),
                  Container(
                    padding: EdgeInsets.all(5.0),
                    alignment: Alignment.bottomCenter,
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                        colors: <Color>[
                          Colors.black.withAlpha(0),
                          Colors.black12,
                          Colors.black45
                        ],
                      ),
                    ),
                    child: Padding(
                      padding: EdgeInsets.all(10),
                      child: Column(
                          mainAxisAlignment: MainAxisAlignment.end,
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            Text(
                              this.option,
                              style:
                                  TextStyle(fontSize: 24, color: Colors.white),
                            ),
                            Padding(
                                padding: EdgeInsets.only(top: 5),
                                child: Text(
                                  this.optDesc,
                                  style: TextStyle(
                                      fontSize: 16, color: Colors.white),
                                ))
                          ]),
                    ),
                  ),
                ])),
          ),
        ));
  }
}
