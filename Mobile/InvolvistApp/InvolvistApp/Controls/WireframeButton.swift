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
    
    var wireBorderLineWidth: CGFloat = 1.0
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
        borderLine.lineWidth = wireBorderLineWidth
        wireBorderColor.setStroke()
        
        borderLine.move(to: CGPoint(x: wireBorderLineWidth, y: wireBorderLineWidth))
        borderLine.addLine(to: CGPoint(x: self.frame.width - wireBorderLineWidth, y: wireBorderLineWidth))
        borderLine.addLine(to: CGPoint(x: self.frame.width - wireBorderLineWidth, y: self.frame.height - wireBorderLineWidth))
        borderLine.addLine(to: CGPoint(x: wireBorderLineWidth, y: self.frame.height - wireBorderLineWidth))
        borderLine.addLine(to: CGPoint(x: wireBorderLineWidth, y: wireBorderLineWidth))
        borderLine.stroke()
    }
}
