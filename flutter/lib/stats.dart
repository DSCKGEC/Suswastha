import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';

class StatsRoute extends StatelessWidget {
  @override 
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('COVID-19 Stats')
      ),
      body: Center(
        child: Text('Stats page')
      ),
    );
  }
}