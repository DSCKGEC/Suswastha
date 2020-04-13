import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:geolocator/geolocator.dart';
import 'package:sliding_up_panel/sliding_up_panel.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:http/http.dart' as http;
import 'dart:convert' as convert;

class MapWidget extends StatefulWidget {
  @override
  _MapWidgetState createState() => _MapWidgetState();
}

class _MapWidgetState extends State<MapWidget> {
  GoogleMapController mapController;
  Map<MarkerId, Marker> markers = <MarkerId, Marker>{};
  List<Circle> areas = [];
  LatLng _center;
  bool loading;
  final String placesApi = 'AIzaSyDktm9IgQBFvTqouxFPE1FDgl7tkTOVy0k';
  @override
  void initState() {
    super.initState();
    loading = true;
    //TODO: Find data from server
    _center = LatLng(22.5726, 88.3639);
  }

  void _onMapCreated(GoogleMapController controller) {
    mapController = controller;
  }

  Future _addMarker(LatLng ll) async {
    setState(() {
      markers.clear();
      final MarkerId markerId = MarkerId("RANDOM_ID85959");
      Marker marker = Marker(
        markerId: markerId,
        draggable: true,
        position:
            ll, //With this parameter you automatically obtain latitude and longitude
        infoWindow: InfoWindow(
          title: "Marker here",
          snippet: 'This looks good',
        ),
        icon: BitmapDescriptor.defaultMarker,
      );

      markers[markerId] = marker;
    });
  }

  Future<void> getMapData() async {
    Position position = await Geolocator()
        .getCurrentPosition(desiredAccuracy: LocationAccuracy.high);
    var url =
        'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' +
            position.latitude.toString() +
            ',' +
            position.longitude.toString() +
            '&radius=1500&type=shops&key=' +
            placesApi;
    //var response = await http.get(url);
    Firestore.instance.collection('severity').snapshots().listen((snap) {
      snap.documents.forEach((ds) {
        Position pos = Position(
            latitude: ds['geo'].latitude, longitude: ds['geo'].longitude);

        double opa = double.parse(ds['rank'].toString()) / 2;
        double radi = double.parse(ds['radius'].toString());
        if (this.mounted) {
          this.setState(() {
            areas.add(Circle(
                circleId: CircleId(ds['location']),
                center: LatLng(pos.latitude, pos.longitude),
                radius: (500 * radi) * 1.0,
                fillColor: Colors.red.withOpacity(opa),
                strokeWidth: 0));
            String snip = '';
            if (opa > 0.6) {
              snip = 'High';
            } else if (opa > 0.4 && opa < 0.6) {
              snip = 'Medium';
            } else {
              snip = 'Low';
            }
            markers[MarkerId(ds['location'])] = Marker(
                markerId: MarkerId(ds['location']),
                draggable: false,
                position: LatLng(pos.latitude, pos.longitude),
                infoWindow: InfoWindow(
                    title: ds['location'], snippet: 'Severity : ' + snip));
          });
        }
      });
    });
    if (this.mounted) {
      setState(() {
        //print(positions.length);
        _center = LatLng(position.latitude, position.longitude);
        loading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    getMapData();
    return loading
        ? Center(child: CircularProgressIndicator())
        : Stack(children: <Widget>[
            GoogleMap(
              onMapCreated: _onMapCreated,
              myLocationEnabled: true,
              initialCameraPosition: CameraPosition(
                target: _center,
                zoom: 12.0,
              ),
              markers: Set.from(markers.values),
              circles: Set.from(areas),
            ),
            SlidingUpPanel(
              margin: EdgeInsets.symmetric(horizontal:10),
              borderRadius: BorderRadius.circular(10),
              panelBuilder: (sc) => _panel(sc),
            )
          ]);
  }

  Widget _panel(ScrollController sc) {
    return ListView(
      controller: sc,
      children: <Widget>[
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Padding(
                padding: EdgeInsets.only(top: 20),
                child: Center(
                  child: Text('Explore Essential Services',
                      style: TextStyle(fontSize: 24)),
                ))
          ],
        ),
        Padding(
            padding: EdgeInsets.only(top: 50),
            child: Container(
                padding: EdgeInsets.all(5),
                child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      PlaceCard(
                          name: 'Hospital 1', type: 'hospital', dist: '10km'),
                      PlaceCard(name: 'Shop 1', type: 'shop', dist: '20km'),
                      PlaceCard(name: 'Shop 2', type: 'shop', dist: '5km'),
                      PlaceCard(name: 'Pharmacy 1', type: 'shop', dist: '5km'),
                      PlaceCard(name: 'Pharmacy 2', type: 'shop', dist: '5km')
                    ])))
      ],
    );
  }
}

class PlaceCard extends StatelessWidget {
  final String name;
  final String type;
  final String dist;

  PlaceCard({this.name, this.type, this.dist});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: EdgeInsets.all(10),
      elevation: 5,
      child: Container(
          padding: EdgeInsets.all(20),
          child:
              Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(
              name,
              style: TextStyle(fontSize: 32),
            ),
            Padding(
              padding: EdgeInsets.symmetric(vertical: 10),
              child: Text(
                type,
                style: TextStyle(fontSize: 24),
              ),
            ),
            Text(
              dist + ' from you current location',
              style: TextStyle(fontSize: 18),
            )
          ])),
    );
  }
}

class MapRoute extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text('COVID-19 Hotspots'),
          centerTitle: true,
        ),
        body: MapWidget());
  }
}
