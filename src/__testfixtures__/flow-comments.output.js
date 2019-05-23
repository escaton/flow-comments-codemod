// removed top "@flow" comment
// import types
/*:: import type FlowDefaultTypeImport, {FlowNamedTypeImport} from 'flow-type';*/

/*:: import typeof JSDefaultImport, {JSNamedImport} from 'js-module';*/

// regular esm imports
import JSDefaultImport2, {JSNamedImport2} from 'js-module2';

// type alias
/*:: type NumberAlias = number;*/

/*:: type ObjectAlias = {
  property: string,
  method(): number,
};*/

/*:: type UnionAlias = 1 | 2 | 3;*/
/*:: type AliasAlias = ObjectAlias;*/

/*:: type AliasWithGenerics<A, B, C> = {
    property: A,
    method(val: B): C,
};*/

// opaque type alias
/*:: opaque type ID = string;*/

// interface
/*:: interface TestInterface {
    interfaceMethod(value: string): void;
}*/

// export types and interfaces
/*:: export type ExportType = NumberAlias;*/

/*:: export interface ExportInterface {}*/
/*:: export opaque type ExportID = string;*/

// primitive variable type
var a/*: number*/ = 1;

// object variable type
var b/*: {
    c: number
}*/ = { c: 10 };

// using type alias
var c/*: UnionAlias*/ = 1;

// typeof variable type
var d/*: typeof JSDefaultImport2*/ = {}

// function arg and return types
function fn1(a/*: boolean*/, b/*: number*/)/*: void*/ {}

// arrow function arg and return types
const fn2 = (a/*: boolean*/, b/*: number*/)/*: void*/ => {}

// function variable type
const fn3/*: (a: boolean, b: number) => void*/ = (a, b) => {}

// maybe arg
function fn4(a/*: ?boolean*/)/*: void*/ {}

// optional arg
function f5(a/*::?: boolean*/)/*: void*/ {}

// optional typeless arg
function f6(a/*::?*/)/*: void*/ {}

// optional "maybe" arg
function f7(a/*::?: ?boolean*/)/*: void*/ {}

// function with generic
function f8/*:: <T>*/(a/*: T*/)/*: void*/ {}

// class
class C1 {
    // prop type
    /*:: prop1: number*/

    //prop with type and value
    prop2/*: number*/ = 1;
    // method
    method(value/*: string*/)/*: void*/ {
        console.log(value);
    }
}

// class with generic
class C2/*:: <T>*/ {}

// class implements interface
class C3 /*:: implements TestInterface*/
{
    interfaceMethod(value/*: string*/)/*: void*/ {}
    interfaceMethod2(value/*: string*/) {}
}

// class with generic and interface
class C4/*:: <T>*/ /*:: implements TestInterface*/
{
    interfaceMethod(value/*: string*/)/*: void*/ {}
}

// class extends with generic
class C5 extends Component/*:: <Props>*/ {
    render() {
        return null;
    }
}

// simple type cast
var e = ((d/*: number*/));

// nested type cast
var f = (((d/*: any*/)/*: number*/));