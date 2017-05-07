//
//  WireframeButton.swift
//  InvolvistApp
//
//  Created by Ruben Hansen-Rojas on 5/5/17.
//  Copyright © 2017 Involvist. All rights reserved.
//

import Foundation
import UIKit

class WireframeButton: UIButton
{
    var wireBorderColor: UIColor = UIColor.black
    {
        didSet
        {
            setNeedsDisplay()
        }
    }
    
    override func draw(_ rect: CGRect)
    {
        super.draw(rect)
        
        let borderLine = UIBezierPath()
        borderLine.lineWidth = 3.0
        wireBorderColor.setStroke()
        
        borderLine.move(to: CGPoint.zero)
        borderLine.addLine(to: CGPoint(x: self.frame.width, y: 0))
        borderLine.addLine(to: CGPoint(x: self.frame.width, y: self.frame.height))
        borderLine.addLine(to: CGPoint(x: 0, y: self.frame.height))
        borderLine.addLine(to: CGPoint.zero)
        borderLine.stroke()
        
        /*
        guard let context: CGContext = UIGraphicsGetCurrentContext() else
        {
            return;
        }
        
        context.setLineWidth(3.0)
        context.setStrokeColor(wireBorderColor.cgColor)
        context.addLines(between: [CGPoint.zero, CGPoint(x:0, y:self.frame.width), CGPoint(x: self.frame.width, y: self.frame.height)])
        context.strokePath()
         */
    }
}
