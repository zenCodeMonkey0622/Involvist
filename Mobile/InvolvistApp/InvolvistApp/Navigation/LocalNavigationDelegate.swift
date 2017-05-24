//
//  LocalNavigationDelegate.swift
//  InvolvistApp
//
//  Created by Ruben Hansen-Rojas on 5/22/17.
//  Copyright © 2017 Involvist. All rights reserved.
//

import Foundation
import UIKit

protocol LocalNavigationDelegate: class
{
    func navigateTo(destinationView: DestinationView)
    func dismiss(viewController: UIViewController)
}
