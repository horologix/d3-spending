#include <iostream>
#include <fstream>
#include <string>
#include <sstream>
#include <vector>
#include <map>

using namespace std;

vector<string> split(const string &s, char delim) {
    vector<string> v;
    stringstream ss(s);
    string item;
    while(getline(ss, item, delim)) {
        v.push_back(item);
    }
    return v;
}

int main() {
    string s;
    ifstream fin("tdata.csv");
    ofstream fout("departments.txt");

    map<string, int> m;

    getline(fin, s);
    while(getline(fin, s)) {
        vector<string> v = split(s, ',');
        m[v[0]]++;
    }

    int c=0;
    for(map<string,int>::iterator I=m.begin(); I!=m.end(); I++) {
        fout<<I->first<<" "<<I->second<<endl;
        c+=I->second;
    }
    cout<<c<<endl;

    fout.close();
    return 0;
}
