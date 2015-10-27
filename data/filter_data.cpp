#include <iostream>
#include <fstream>
#include <string>
#include <sstream>
#include <vector>

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
    ifstream fin("data.csv");
    ofstream fout("tdata.csv");

    getline(fin, s);
    while(getline(fin, s)) {
        vector<string> v = split(s, ',');
        fout<<v[2]<<",";
        fout<<v[3]<<",";
        fout<<v[4]<<",";
        fout<<v[5]<<",";
        fout<<v[8]<<",";
        fout<<v[13]<<",";
        fout<<v[16];
        fout<<endl;
    }

    fout.close();
    return 0;
}
