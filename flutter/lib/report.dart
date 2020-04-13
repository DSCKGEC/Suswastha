import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:geolocator/geolocator.dart';


class Report {
  String name;
  String contact;
  String report;
  String subject;
  String locality;
  Report({this.name, this.contact, this.report, this.subject,this.locality});

  Future<void> sendData(BuildContext context) async {
    Position position = await Geolocator()
        .getCurrentPosition(desiredAccuracy: LocationAccuracy.high);
    await Firestore.instance.collection('reports').add(<String,dynamic>{
      'name' : name,
      'contact' : contact,
      'content' : report,
      'resolved' : false,
      'subject' : subject,
      'created' : FieldValue.serverTimestamp(),
      'lat' : position.latitude,
      'lng' : position.longitude,
      'location' : locality
    });
    Navigator.pop(context);
  }
}

class ReportForm extends StatefulWidget {
  @override
  _ReportFormState createState() => _ReportFormState();
}

class _ReportFormState extends State<ReportForm> {
  final _formkey = GlobalKey<FormState>();
  Report report;

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    report = Report(name: '',contact: '',report: '',subject: '',locality: '');
    print(report);
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(vertical: 16, horizontal: 16),
      child: Form(
        key: _formkey,
        child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: <Widget>[
              TextFormField(
                decoration: InputDecoration(labelText: 'Full Name :'),
                validator: (value) {
                  if (value.isEmpty) {
                    return 'Please enter your full name';
                  }
                },
                onSaved: (val) => setState(() => report.name = val),
              ),
              Padding(
                padding: EdgeInsets.only(top: 20),
                child: TextFormField(
                  decoration: InputDecoration(labelText: 'Contact Number :'),
                  validator: (value) {
                    if (value.isEmpty) {
                      return 'Please enter your Contact Number';
                    } else {
                      if (value.length != 10) {
                        return 'Enter a valid phone number';
                      }
                    }
                  },
                  onSaved: (val) => setState(() => report.contact = val),
                ),
              ),
              Padding(
                padding: EdgeInsets.only(top: 20),
                child: TextFormField(
                  decoration: InputDecoration(labelText: 'Complaint Subject :'),
                  validator: (value) {
                    if (value.isEmpty) {
                      return 'Please enter your Complaint Subject';
                    }
                  },
                  onSaved: (val) => setState(() => report.subject = val),
                ),
              ),
              Padding(
                  padding: EdgeInsets.only(top: 20),
                  child: TextFormField(
                    decoration:
                        InputDecoration(labelText: 'Complaint Report :'),
                    maxLines: null,
                    keyboardType: TextInputType.multiline,
                    validator: (value) {
                      if (value.isEmpty) {
                        return 'Please enter your Complaint Report';
                      }
                    },
                    onSaved: (val) => setState(() => report.report = val),
                  )),
              Padding(
                  padding: EdgeInsets.only(top: 20),
                  child: TextFormField(
                    decoration:
                        InputDecoration(labelText: 'Your locality :'),
                    maxLines: null,
                    keyboardType: TextInputType.multiline,
                    validator: (value) {
                      if (value.isEmpty) {
                        return 'Please enter your Locality';
                      }
                    },
                    onSaved: (val) => setState(() => report.locality = val),
                  )),
              Padding(
                  padding: EdgeInsets.only(top: 20),
                  child: Container(
                      child: RaisedButton(
                          onPressed: () {
                            final form = _formkey.currentState;
                            if (form.validate()) {
                              form.save();
                              print(this.report);
                              report.sendData(context);
                            }
                          },
                          child: Text('Submit'))))
            ]),
      ),
    );
  }
}

class ReportRoute extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Report Complaints'),
        centerTitle: true,
      ),
      body: ReportForm(),
    );
  }
}
